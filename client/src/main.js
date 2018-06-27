new Vue({
  el: "#app",
  data: {
    isLoggedIn: false,
    isRegister: false,
    isProfile: false,
    showLiked: false,
    showResult: false,
    username: "user2",
    email: "",
    password: "user1234",
    name: "",
    posts: "",
    newPost: "",
    warning: "",
    hasWarning: false,
    search: "",
    result: "",
    user: "",
    newComment: "",
    openPost: {like: [], comments: []}
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
            localStorage.setItem("username", data.username);
            this.user = localStorage.getItem("username");
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
            localStorage.setItem("username", data.username);
            this.user = localStorage.getItem("username");
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
        .get("http://localhost:3000/post/", config)
        .then(({ data }) => {
          console.log(data);
          this.posts = data.posts;
          this.showLiked = false;
          this.isProfile = false;
          this.showResult = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserPosts: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      axios
        .get(`http://localhost:3000/post/${this.user}`, config)
        .then(({ data }) => {
          console.log(data);
          this.posts = data.posts;
          this.showLiked = false;
          this.isProfile = true;
          this.showResult = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLikedPosts: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      axios
        .get(
          `http://localhost:3000/post/${this.user}?like=${this.user}`,
          config
        )
        .then(({ data }) => {
          console.log(data);
          this.posts = data.posts;
          this.showLiked = true;
          this.isProfile = true;
          this.showResult = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addPost: function() {
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let payload = {
        username: this.user,
        postText: this.newPost
      };
      axios
        .post("http://localhost:3000/post", payload, config)
        .then(({ data }) => {
          if (data.postText) {
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
        .put(`http://localhost:3000/post/${postId}`, payload, config)
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
        .delete(`http://localhost:3000/post/${postId}`, config)
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
          .get(`http://localhost:3000/post?search=${query}`, config)
          .then(({ data }) => {
            console.log(data);
            this.posts = data.posts;
            this.isProfile = false;
            this.showResult = true;
            this.result = this.search;
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
        .put(`http://localhost:3000/post/${postId}`, payload, config)
        .then(({ data }) => {
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
        .put(`http://localhost:3000/post/${postId}`, payload, config)
        .then(({ data }) => {
          this.getPosts();
          this.cleanInput();
        })
        .catch(err => {
          console.log(err);
        });
    },
    addComment: function() {
      let postId = this.openPost._id
      let token = localStorage.getItem("token");
      let config = { headers: { token } };
      let payload = {
        username: this.user,
        body: this.newComment
      };
      axios
        .post(`http://localhost:3000/post/${postId}/comment`, payload, config)
        .then(({ data }) => {
          if (data.body) {
            this.warning = data;
            this.hasWarning = true;
          } else {
            if (this.showLiked) {
              this.getLikedPosts();
            } else if (this.isProfile && !this.showLiked) {
              this.getUserPosts();
            } else {
              this.getPosts();
            }
            this.cleanInput();
          }
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
      this.username = "";
      this.email = "";
      this.password = "";
      this.name = "";
      this.search = "";
      this.newComment = "";
      this.newPost = "";
    }
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.user = localStorage.getItem("username");
      this.isLoggedIn = true;
      this.getPosts();
    }
  }
});
