# Saldo

A simple finance platform.

![Node.js](https://img.shields.io/badge/node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

Have you ever wanted to keep your financial data private, instead of relying on third-parties to store your data?   
Saldo is the perfect option to self-host a finance management platform, it is completely open-source, does not need a internet connection and you can make your very own frontend, because the logic and functionality of the frontend is independent of the backend.   
In a few steps you can set it up completely on your own.

---

## Content

- [Setup](#setup)

- [Credits](#credits)

---

## Before you begin...
...AI helped me build this project, it was used to create a CSS design for the frontend, because I'm not a good designer with CSS.

---

## Setup

### Linux

0. Firstly, make sure you're system is up to date and you have the required packages installed:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install npm nodejs git -y
```

1. After it installed successfully, you then clone the repo and jump into it:

```bash
git clone https://github.com/BrunoGC13/Saldo.git
cd Saldo/
```

2. Then install the required NodeJS packages:

```bash
npm install
```

3. After the installation was finished you can start the platform by running:

```bash
npm start
```

The output should look like this:

```text
Server started on http://localhost:3000
```

4. You then can visit the website by accessing http://localhost:3000

5. Optional - but recommended

If you're planning to run this system 24/7 I recommend using `tmux` on Linux to let the process run even if you terminate the terminal session.   
To do that, run the following command:

```bash
tmux new -s finance
```

You then repeat step 3 and then you press `Ctrl + B` and shortly after `D`.   
If you have to access the terminal you can run:

```bash
tmux attach -t finance
```

You can then do your stuff and leave the terminal with `Ctrl + B` and `D`.