// // import openSocket from 'socket.io-client';

// // const socket = openSocket('http://localhost:8080');
// //     socket.on('sendChat' , data => {
// //       if( data.actionName === 'sendingChatByUser'){
// //         this.addPost(data.chat);
// //       } else if( data.actionName === 'editingPostByUser'){
// //         this.updatePost(data.post);
// //       }else if( data.actionName === 'deleteChatByUser'){
// //         this.loadPosts();
// //       }
// // });

// // addPost = chat => {
// //     this.setState(prevState => {
// //       const updatedPosts = [...prevState.posts];
// //       if (prevState.postPage === 1) {
// //         if (prevState.posts.length >= 2) {
// //           updatedPosts.pop();
// //         }
// //         updatedPosts.unshift(post);
// //       }
// //       return {
// //         posts: updatedPosts,
// //         totalPosts: prevState.totalPosts + 1
// //       };
// //     });
// //   };


// // $ (function() { 
// //     var socket = io.connect('http://localhost:8080'); 
// //     var message = $("#message"); 
// //     var username = $("#username"); 
// //     var send_message = $("#send_message"); 
// //     var send_username = $("#send_username"); 
// //     var chatroom = $("#chatroom"); 
  
// //     send_username.click(function() { 
// //         console.log(username.val()); 
// //         socket.emit('change_username',  
// //           { username : username.val() }); 
// //     }); 
// // });

// // document.addEventListener('DOMContentLoaded', function () {
// //     const socket = io();

// //     // Add the following code to send a new chat to the server
// //     document.querySelector('.msger-send-btn').addEventListener('click', function (e) {
// //       e.preventDefault();
// //       const message = document.getElementById('con').value;
// //       const userId = '<%= userId %>';

// //       // Emit the 'sendChat' event to the server
// //       socket.emit('sendChat', { message, userId });
// //     });

// //     // Add the following code to handle new chats received from the server
// //     socket.on('sendChat', (data) => {
// //         fetch('http://localhost:8080/allChats' , {
// //       headers : {
// //         'Content-Type' : 'application/json'
// //       }
// //     })
// //       .then(result => {
// //         if (result.status !== 200) {
// //           throw new Error('Failed to fetch posts.');
// //         }
// //         return result.json();
// //       })
// //       .then(resData => {
// //         res.render('logPages/chatting', {
// //           path : '/chat' ,
// //           pageTitle : 'chatting' , 
// //           isTeamLeader : false
// // ,          isLoggedIn : req.session.isLoggedIn ,
// //           userId : req.session.user ,
// //           chats : resData.chats
// //         });
// //       })
// //       .catch(err => {
// //         console.log(err);
// //         res.redirect('/');
// //       })
// //       // Update your UI to display the new chat (similar to how you currently do it)
// //     });

// //     // Add the following code to handle deleted chats received from the server
// //     socket.on('chatDeleted', (data) => {
// //       // Update your UI to remove the deleted chat (similar to how you currently do it)
// //     });
// //   });

// // const mess = document.getElementById('messBox');

// // alert('f');
// // let chats;
// // fetch('http://localhost:8080/allChats' , {
// //       headers : {
// //         'Content-Type' : 'application/json'
// //       }
// //     })
// //       .then(result => {
// //         return result.json();
// //       })
// //       .then(resData => {
// //         chats = resData.chats;
// //       })

// // const socket = openSocket('http://localhost:8080');
// //     socket.on('sendPost' , data => {
// //       if( data.actionName === 'sendingPostByUser'){
// //         this.addPost(data.post);
// //       } else if( data.actionName === 'editingPostByUser'){
// //         this.updatePost(data.post);
// //       }else if( data.actionName === 'deletePostByUser'){
// //         this.loadPosts();
// //       }
// //     });

// // const loadchats = (data) => {
    
// // }

// let chats;

// const fetchChats = () => {
//   fetch('http://localhost:8080/allChats', {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(result => result.json())
//   .then(resData => {
//     chats = resData.chats;
//     loadChats(chats);
//   });
// }

// const socket = openSocket('http://localhost:8080');
// socket.on('sendPost', data => {
//   if (data.actionName === 'sendingPostByUser') {
//     chats.push(data.chat);
//     loadChats(chats);
//   }
// });

// const loadChats = (chats) => {
//   const messBox = document.getElementById('messBox');
//   messBox.innerHTML = '';

//   if (chats.length > 0) {
//     for (let chat of chats) {
//       const msgDiv = document.createElement('div');
//       if (chat.userId !== userId) {
//         msgDiv.className = 'msg left-msg';
//         msgDiv.innerHTML = `<div class="msg left-msg">
//         <div
//          class="msg-img"
//          style="background-image: url(images/28.jpeg)"
//         ></div>
//         <div class="msg-bubble">
//           <div class="msg-info">
//             <div class="msg-info-name">${chat.name}-${chat.clg}</div>
//             <div class="msg-info-time">${chat.createdAt}</div>
//           </div>
//           <div class="msg-text">
//           ${chat.content}
//           </div>
//         </div>
//       </div>`;
//       } else {
//         msgDiv.className = 'msg right-msg';
//         msgDiv.innerHTML = `<div class="msg right-msg">
//         <div
//          class="msg-img"
//          style="background-image: url(images/29.jpeg)"
//         ></div>
//         <div class="msg-bubble">
//           <div class="msg-info">
//             <div class="msg-info-name">${chat.name}-${chat.clg}</div>
//             <div class="msg-info-time">${chat.createdAt}</div>
//           </div>
//           <div class="msg-text">
//           ${chat.content}
//             <div >
//               <a href="/deleteChat/${chat._id}" class="btn">Delete</a>
//           </div>
//           </div>
//         </div>
//       </div>`;
//       }
//       messBox.appendChild(msgDiv);
//     }
//   }
// }

// const sendMessage = () => {
//   // Handle sending message logic here
//   // Use the input values and send the message via socket.emit()
//   // Remember to prevent the form from submitting, as you're handling it through AJAX
//   return false;
// }

// // Initial fetch of chats
// fetchChats();
 
const openSocket = require('socket.io-client');

const socket = openSocket('http://localhost:8080');
console.log('entered')
    socket.on('sendChat' , data => {
      if( data.actionName === 'sendingChatByUser' || data.actionName === 'deleteChatByUser'){
        console.log("started fenching");
        fetch('http://localhost:8080/allChats' , {
      headers : {
        'Content-Type' : 'application/json'
      }
    })
      .then(result => {
        if (result.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        return result.json();
      })
      .then(resData => {
        res.render('logPages/chatting', {
          path : '/chat' ,
          pageTitle : 'chatting' , 
          isTeamLeader : true
,          isLoggedIn : req.session.isLoggedIn ,
          userId : req.session.user ,
          chats : resData.chats
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/');
      })
      }
    });
