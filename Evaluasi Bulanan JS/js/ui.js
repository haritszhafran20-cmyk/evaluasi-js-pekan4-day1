const UI = {
  renderLogin() {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>Login</h2>
        <input id="user" placeholder="Username">
        <input id="pass" placeholder="Password" type="password">
        <button id="btnLogin">Login</button>
        <button id="btnReg">Register</button>
      </div>
    `;

    document.getElementById("btnLogin").onclick = () => {
      if (Auth.login(user.value, pass.value)) {
        UI.renderDashboard(user.value);
      } else {
        alert("Username atau password salah.");
      }
    };

    document.getElementById("btnReg").onclick = () => {
      UI.renderRegister();
    };
  },

  renderRegister() {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>Register</h2>
        <input id="ruser" placeholder="Username">
        <input id="rpass" placeholder="Password" type="password">
        <button id="doReg">Register</button>
      </div>
    `;

    document.getElementById("doReg").onclick = () => {
      if (Auth.register(ruser.value, rpass.value)) {
        UI.renderLogin();
      } else {
        alert("Username sudah dipakai.");
      }
    };
  },

  renderDashboard(username) {
    let todos = Todo.list(username);

    document.getElementById("app").innerHTML = `
      <div class="header">
        <h2>To-Do List Premium</h2>
        <button id="darkToggle">🌓</button>
        <button id="logout">Logout</button>
      </div>

      <div class="quote-box" id="quoteBox">Loading quote...</div>

      <div class="add-box">
        <input id="task" placeholder="Tambah tugas...">
        <button id="addTask">Tambah</button>
      </div>

      <ul id="todoList">
        ${todos
          .map(
            t => `
          <li>
            <div>
              <input type="checkbox" data-id="${t.id}" ${
              t.done ? "checked" : ""
            }>
              <span class="${t.done ? "done" : ""}">${t.text}</span>
            </div>
            <button data-del="${t.id}">Hapus</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    document.getElementById("logout").onclick = () => {
      Auth.logout();
      UI.renderLogin();
    };

    document.getElementById("addTask").onclick = () => {
      const text = task.value.trim();
      if (text.length > 0) {
        Todo.add(username, text);
        UI.renderDashboard(username);
      }
    };

    document.querySelectorAll("input[type=checkbox]").forEach(ch => {
      ch.onclick = () => {
        Todo.toggle(username, ch.dataset.id);
        UI.renderDashboard(username);
      };
    });

    document.querySelectorAll("[data-del]").forEach(btn => {
      btn.onclick = () => {
        Todo.remove(username, btn.dataset.del);
        UI.renderDashboard(username);
      };
    });

    document.getElementById("darkToggle").onclick = () => {
    document.body.classList.toggle("dark");
    DB.set("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

    fetch("https://api.adviceslip.com/advice")
      .then(r => r.json())
      .then(data => {
        document.getElementById("quoteBox").innerText = '"' + data.slip.advice + '"';
      });
  }
};
