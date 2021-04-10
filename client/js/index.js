const socket = io();
const form = document.querySelector('.chat__elems');
const textaria = form.querySelector('.materialize-textarea');
const allMes = document.querySelector('.messages');
const lengthUsers = document.querySelector('.chat__length-users');
const chatBtn = document.querySelector('.chat__btn');
const chatWindow = document.querySelector('.chat__window');

const modal = document.querySelector('.chat__modal')
const modalInput = modal.querySelector('.modal__input');
const modalBtn = modal.querySelector('.modal__btn');
const randomNum = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
const userColors = ['lime lighten-3', 'cyan accent-2', 'light-blue', 'indigo lighten-3', 'red lighten-3']
const eventText = document.querySelector('.chat__event-text')


modalInput.value = '';
chatBtn.setAttribute("disabled", "disabled");

modalBtn.setAttribute("disabled", "disabled");


socket.on('lengthUsers', length => {
    let users = '';
    length > 1 ? users = 'users' : users = 'user';
    lengthUsers.textContent = `${length} ${users} online`;
})


const starChat = () => {


    const createMes = (text, author, time, color) => {
        let col = color.split(' ');
        let mess = document.createElement("div");
        mess.classList.add("messages__item", "card-panel", `${col[0]}`, `${col[1]}`);
        mess.innerHTML = `
                    <div class="massages__info ">
                        <div class="messages__author">${author}</div>
                        <div class="messages__time">in ${time}</div>
                    </div>
                    <div class="massages__text">${text}</div>
                `;

        return mess;
    }

    socket.on('add_message', ({ text, author, time, color }) => {
        let mess = createMes(text, author, time, color)
        allMes.appendChild(mess);
        let scroll = chatWindow.scrollHeight;
        chatWindow.scrollTop = scroll;
        
    });

    textaria.addEventListener('input', (e) => {
        e.target ? socket.emit('enter_text', modalInput.value || 'user') : null
    
    });

    socket.on('nameUser' , (name) => {
        console.log(name);
        eventText.textContent = `${name} pressing message...`;
        
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        
        if (textaria.value) {
            socket.emit('send_message', {
                text: textaria.value,
                author: modalInput.value || 'user',
                time: new Date().toLocaleTimeString().slice(0, -6),
                color: userColors[randomNum]

            });
            textaria.value = '';
            
            
        }
    })


}


const initChat = () => {
    modalInput.addEventListener('input', () => {

        modalInput.value == '' ? modalBtn.setAttribute("disabled", "disabled") : modalBtn.removeAttribute("disabled", "disabled");
    })
    modalBtn.addEventListener('click', () => {
        modal.classList.add('close')

        starChat()
        chatBtn.removeAttribute("disabled", "disabled");

    })
}

initChat();










