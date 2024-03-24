---
title: "Github credentials on a command prompt / terminal"
date: "2018-11-26"
categories: 
  - "programming"
tags: 
  - "command-prompt"
  - "credentials"
  - "git"
  - "github"
  - "terminal"
---

This post only walks through the login process for the terminal. The goal is to login once and never have to enter your password ever again in the terminal. Your user configuration can always be checked by reading the git file directly.  

```
git config --global -e
```

Befor configuring the user make sure to set the credential helper first.

```
git config --global credential.helper wincred
```

or for linux  

```
git config --global credential.helper manager
```

Or you can save the password temporarily. For even more info see ([https://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-on-github](https://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-on-github))  

```
git config --global credential.helper cache
```

After that we have to configure our credentials once and that's it.  

```
git config --global user.name TheCell
git config --global user.email contactme@thecell.eu
git config --global github.user TheCell
git config --global github.token mypassword
```
