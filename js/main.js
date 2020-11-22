
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


const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS',
    photo: 'https://get.pxhere.com/photo/man-person-people-hair-photography-male-guy-portrait-romance-fashion-hairstyle-beard-temple-photograph-emotion-portrait-photography-facial-hair-93882.jpg'
  },
  {
    id:'02',
    email: 'kate@mail.com',
    password: '12345',
    displayName: 'KateKillMaks'
  }
];

const setUsers = {
  user: null, 
  logIn(email, password, handler){
    if(!regExpValidEmail.test(email)) {
      alert('Email не валиден');
      return;     
    }
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.autorizedUser(user);
      if(handler) {
        handler();
      } 
    } else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut(handler){
    this.user = null;
    if(handler) {
      handler();
    }
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

    if (!this.getUser(email)){
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.autorizedUser(user); 
      if(handler) {
        handler();
      }
    } else {
      alert('Пользователь с таким Email уже зарегистрирован');
    }
  },
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  },
  getUser(email) {
    /* let user = null;
    for (let i = 0; i < listUsers.length; i++){
      if (listUsers[i].email === email){
        user = listUsers[i];
        break;
      }
    }
    return user; */
    return listUsers.find(item => item.email === email)
  },
  autorizedUser(user) {
    this.user = user;
  }

};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовлок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags:['свежее','новое','горячее','мое','случайность'],
      author: {displayName: 'maks', photo: 'https://get.pxhere.com/photo/man-person-people-hair-photography-male-guy-portrait-romance-fashion-hairstyle-beard-temple-photograph-emotion-portrait-photography-facial-hair-93882.jpg'},
      date: '11.11.2020, 20:54:00',
      loke: 45,
      comment: 12
    },
    {
      title: 'Заголовлок поста2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags:['свежее','новое','горячее','мое','случайность'],
      author: {displayName: 'maks', photo: 'https://get.pxhere.com/photo/man-person-people-hair-photography-male-guy-portrait-romance-fashion-hairstyle-beard-temple-photograph-emotion-portrait-photography-facial-hair-93882.jpg'},
      date: '10.11.2020, 20:54:00',
      loke: 45,
      comment: 12
    }
  ],

  addPost(title,text, tags, handler) {
    this.allPosts.unshift({
      title, 
      text, 
      tags: tags.split(',').map(item => item.trim()), 
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo
      }, 
      date: new Date().toLocaleString(),
      like: 0, 
      comments: 0,
    })

    if(handler) {
      handler();
    }
  }
}

const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginForm.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
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
    const passwordValue = passwordInput.passwordValue;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
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
  
  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded', init);

