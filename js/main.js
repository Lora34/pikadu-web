
 // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCqmAR8vvwN4XZGWHkexfWYD7ErH1mELMM",
      authDomain: "picadu-1ee09.firebaseapp.com",
      databaseURL: "https://picadu-1ee09.firebaseio.com",
      projectId: "picadu-1ee09",
      storageBucket: "picadu-1ee09.appspot.com",
      messagingSenderId: "848657360036",
      appId: "1:848657360036:web:ccf065b413b09b1c54b231",
      measurementId: "G-DKXNF8DKEE"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //firebase.analytics();

    console.log('firebase:', firebase);
// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const login = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup'); 
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');
const loginForget = document.querySelector('.lorget-forget');

const default_photo = userAvatarElem.src;
const setUsers = {
  user: null, 

  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user;
      }else {
        this.user = null;
      }
      if(handler) {
        handler();
      } 
    })
  },
    logIn(email, password, handler){
    if(!regExpValidEmail.test(email)) {
      alert('Email не валиден');
      return;     
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => {
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/wrong-password') {
          console.log(errMessage);
          alert('Неверный пароль')
      } else if(errCode === 'auth/user-not-found') {
          console.log(errMessage);
          alert('Пользователь не найден')
      }else {
        alert(errMessage)
      }
    })
    /* const user = this.getUser(email);
    if (user && user.password === password) {
      this.autorizedUser(user);
      if(handler) {
        handler();
      } 
    } else {
      alert('Пользователь с такими данными не найден')
    } */
  },
  logOut(){
    
    firebase.auth().signOut();
  },
  signUp(email, password, handler){
    if(!regExpValidEmail.test(email)) {
      alert('Email не валиден');
      return;     
    }

    /* if(!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }  */

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      this.editUser(email.substring(0, email.indexOf('@')), null, handler)
    })
    .catch(err => {
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/weak-password') {
          console.log(errMessage);
          alert('Слабый пароль')
      } else if(errCode === 'auth/email-already-in-use') {
        console.log(errMessage);
        alert('Этот email уже используется')
      }else {
        alert(errMessage)
      }

      console.log(errMessage);
    })
    /* if (!this.getUser(email)){
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.autorizedUser(user); 
      if(handler) {
        handler();
      }
    } else {
      alert('Пользователь с таким Email уже зарегистрирован');
    } */
  },
  editUser(displayName, photoURL, handler) {
    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else {
        user.updateProfile({
          displayName
        }).then(handler)
      }
    }
  },
  /*
  getUser(email) {
    /* let user = null;
    for (let i = 0; i < listUsers.length; i++){
      if (listUsers[i].email === email){
        user = listUsers[i];
        break;
      }
    }
    return user; */
    /* 
    return listUsers.find(item => item.email === email)
      },
      */
    /*  autorizedUser(user) {
        this.user = user;
      } */
  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
    alert('Письмо отправлено')
    })
    .catch(err => {
    console.log(err);
    })
  }
};
const setPosts = {
  allPosts: [],

  addPost(title,text, tags, handler) {
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title, 
      text, 
      tags: tags.split(',').map(item => item.trim()), 
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL
      }, 
      date: new Date().toLocaleString(),
      like: 0, 
      comments: 0,
    })

    firebase.database().ref('post').set(this.allPosts)
    .then(() => this.getPosts(handler))
    
  },

  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
}
const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginForm.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || default_photo;
    buttonNewPost.classList.add('visible');
  } else {
    loginForm.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible')  ;
  }
};
const showAddPosts = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}
const showAllPosts = () => {
  

  let postsHTML = '';

  
  setPosts.allPosts.forEach(({title, text, date, tags, like, comments, author}) => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
        ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>` )}
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">5 минут назад</span>
        </div>
        <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `;
  })

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
}
const init = () => {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
  
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  loginSignup.addEventListener('click', event => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut();
  });
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
  
    setUsers.editUser(editUsername.value, editPhotoURL.value,toggleAuthDom);
    editContainer.classList.remove('visible');
  })

    // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

  buttonNewPost.addEventListener('click', event => {
    event.preventDefault();
    showAddPosts();
  })

  addPostElem.addEventListener('submit',event => {
    event.preventDefault();
    //const formElements = [...addPostElem.elements].filter(elem => elem.tagName !== 'BUTTON');  //возвращает массив из элементов, позволяет работать с элементами как с массивом, со всеми его методами
    const { title, text, tags } = addPostElem.elements;
    console.log(title, text, tags);

    if(title.value.length < 6) {
      alert('Слишком короткий заголовок');
      return;
    }

    if(title.value.length > 50) {
      alert('Слишком короткий пост');
      return;
    }

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();

  })
  loginForget.addEventListener('click', event => {
    event.preventDefault();
    setUsers.sendForget(emailInput.value);
    emailInput.value = '';
  })

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
}
document.addEventListener('DOMContentLoaded', init);

