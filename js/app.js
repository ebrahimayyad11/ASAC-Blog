'use strict';

let articleArr = [];
let form = document.getElementById('form');
let div = document.getElementById('div2');


function article (id , author , title , subject , content , day , month , year){
  this.id = id;
  this.author = author;
  this.title = title;
  this.subject = subject;
  this.content = content;
  this.day = day;
  this.month = month;
  this.year = year;
  this.likes = this.numberOfLikes();
}

article.prototype.numberOfLikes = function(){
  let random = Math.random() * (500 - 1) + 1;
  return Math.floor(random);
};

if(localStorage.getItem('articles') !== null){
  addNewArticle(div);
}



form.addEventListener('submit' , submitholder);

function submitholder (event){
  event.preventDefault();
  let author = event.target.author_name.value;
  let title = event.target.article_title.value;
  let subject = event.target.subject.value;
  let content = event.target.content.value;
  let day = event.target.day.value;
  let month = event.target.month.value;
  let year = event.target.year.value;

  if(localStorage.getItem('articles') === null){
    let firstArticle = new article(1,author,title,subject,content,day,month,year);
    articleArr.push(firstArticle);
    localStorage.setItem('articles' , JSON.stringify(articleArr));
    addNewArticle(div);
  }else{
    articleArr = JSON.parse(localStorage.getItem('articles'));
    let newId = (articleArr[articleArr.length - 1].id)+ 1;
    let newArticle = new article(newId , author , title , subject , content , day , month , year);
    articleArr.push(newArticle);
    localStorage.setItem('articles' , JSON.stringify(articleArr));
    addNewArticle(div);
  }

  form.reset();

}


function addNewArticle (div){
  div.innerHTML = '';
  articleArr = JSON.parse(localStorage.getItem('articles'));
  for(let i = 0; i < articleArr.length ; i++){
    let div2 = document.createElement('div');
    div.appendChild(div2);

    let title = document.createElement('p');
    title.textContent = articleArr[i].title;
    div2.appendChild(title);

    let img = document.createElement('img');
    img.setAttribute('src' , './img/asac_ltuc.jpg');
    div2.appendChild(img);

    let author = document.createElement('p');
    author.textContent = 'Author: '+articleArr[i].author;
    div2.appendChild(author);

    let date = document.createElement('p');
    date.textContent = 'Date: '+articleArr[i].day+' - '+articleArr[i].month+' - '+articleArr[i].year;
    div2.appendChild(date);

    let likes = document.createElement('p');
    likes.textContent = articleArr[i].likes +' Likes';
    div2.appendChild(likes);

    let content = document.createElement('p');
    content.textContent = articleArr[i].content;
    div2.appendChild(content);

  }
}

