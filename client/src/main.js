new Vue({
  el: "#app",
  data: {
    isLoggedIn: false,
    isRegister: false,
    username: "user1",
    email: "",
    password: "user1234",
    name: "",
    posts: "",
    editPostId: "",
    updateItem: "",
    warning: "",
    hasWarning: false,
    search: "",
    user: ""
  },
  methods: {
    login: function() {
      let payload = {
        username: this.username,
        password: this.password
      };
      axios
        .post("http://localhost:3000/login", payload)
        .then(({ data }) => {
          if (data.token) {
            this.isLoggedIn = true;
            this.user = data.username;
            localStorage.setItem("token", data.token);
            this.getPosts();
            this.cleanInput();
          } else {
            this.warning = data;
            this.hasWarning = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout: function() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
    },
    register: function() {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        name: this.name
      };
      axios
        .post("http://localhost:3000/register", payload)
        .then(({ data }) => {
          if (data.token) {
            this.isLoggedIn = true;
            this.user = data.name;
            localStorage.setItem("token", data.token);
            this.getPosts();
            this.cleanInput();
            this.isRegister = false;
          } else {
            this.warning = data;
            this.hasWarning = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPosts: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      axios
        .get("http://localhost:3000/user/", config)
        .then(({ data }) => {
          console.log(data);
          this.posts = data.posts;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addPost: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let payload = {
        action: this.newItem,
        tags: this.tags.split(" ")
      };
      axios
        .post("http://localhost:3000/user", payload, config)
        .then(({ data }) => {
          if (data.action) {
            this.warning = data;
            this.hasWarning = true;
          } else {
            this.getPosts();
            this.cleanInput();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatePost: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let postId = this.editPostId;
      let payload;
      axios
        .put(`http://localhost:3000/user/post/${postId}`, payload, config)
        .then(({ data }) => {
          console.log(data);
          this.getPosts();
          this.cleanInput();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deletePost: function(postId) {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      axios
        .delete(`http://localhost:3000/user/post/${postId}`, config)
        .then(({ data }) => {
          console.log(data);
          this.getPosts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchPosts: function() {
      if (this.search !== "") {
        let token = localStorage.getItem("token");
        let config = { headers: { token } };
        let query = this.search;
        axios
          .get(`http://localhost:3000/user?search=${query}`, config)
          .then(({ data }) => {
            console.log(data);
            this.posts = data.posts;
            this.cleanInput();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    likePost: function(postId) {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let payload = {
        likedBy: this.user
      };
      axios
        .put(`http://localhost:3000/user/post/${postId}`, payload, config)
        .then(({ data }) => {
          console.log(data);
          this.getPosts();
          this.cleanInput();
        })
        .catch(err => {
          console.log(err);
        });
    },
    unlikePost: function(postId) {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let payload = {
        unlikedBy: this.user
      };
      axios
        .put(`http://localhost:3000/user/post/${postId}`, payload, config)
        .then(({ data }) => {
          console.log(data);
          this.getPosts();
          this.cleanInput();
        })
        .catch(err => {
          console.log(err);
        });
    },
    isLiked: function(arrayOfUsers) {
      if (arrayOfUsers.indexOf(this.user) < 0) {
        return false;
      } else {
        return true;
      }
    },
    getDate: function(input) {
      let d = new Date(input);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDay();
      return `${day}/${month}/${year}`;
    },
    showUsername: function(username) {
      return "@" + username;
    },
    cleanInput: function() {
      this.updateItem = "";
      this.addTags = "";
      this.removeTags = "";
      this.username = "";
      this.email = "";
      this.password = "";
      this.name = "";
      this.warning = "";
      this.search = "";
    }
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.getPosts();
    }
  }
});
