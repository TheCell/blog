---
title: "starting with PHP"
date: "2016-05-02"
categories: 
  - "programming"
---

**Where to learn PHP?** This post is not for learning PHP. It is meant to show good Codeblocks that are in most PHP files. It should help you so if you google and see older codesnippets you will know what part to replace with newer safer code.

**Receive POST / GET Data from Forms** If you are going to get html form data (POST / GET) make sure to grab data with filter\_input ([http://php.net/manual/de/function.filter-input.php](http://php.net/manual/de/function.filter-input.php)) and filter\_input\_array ([http://php.net/manual/de/function.filter-input.php](http://php.net/manual/de/function.filter-input.php)) don't just trust the data you get from POST/GET if you show the data back to a user or write it to a database. So basically never trust the data. That will help prevent **cross site scripting (XSS)**. By "don't trust" I mean that the user could manipulate the POST data. Also they can include Javascript snippets in it.

The Filters can be found here ([http://php.net/manual/de/filter.constants.php](http://php.net/manual/de/filter.constants.php)). Also you can grab POST and GET data this way by using "INPUT\_POST" or "INPUT\_GET"

ex. \[php\] //DON'T //instead of directly getting the data like this $weather = $\_INPUT\["weather"\]; $number= $\_INPUT\["number"\];

//DO //filter the data and "sanitize" it $weather = filter\_input(INPUT\_POST, 'weather', FILTER\_SANITIZE\_STRING); $number = filter\_input(INPUT\_POST, 'number', FILTER\_SANITIZE\_NUMBER\_INT); // or $number = filter\_input(INPUT\_POST, 'number', FILTER\_SANITIZE\_NUMBER\_FLOAT); \[/php\]

**Database** you will use database connections and if you want to dive into php I suggest you look at mysql aswell. Just to give you a heads up: If you encounter a mysql object in php it's old use mysql**i** ([http://php.net/manual/de/book.mysqli.php](http://php.net/manual/de/book.mysqli.php)) or look at PDO ([http://php.net/manual/de/book.pdo.php](http://php.net/manual/de/book.pdo.php)) from the get go thats the object oriented approach to databaseconnections. Those 2 will prevent **sqlinjection** where the normal mysql databaseconnection will not.

\[php\] //mysqli $db = new EasyMySQLi('host', 'user', 'pass', 'DB'); $ary = $db->querySingleRow('SELECT \* FROM exampletbl WHERE id > ?', 158); echo 'Example-Value is'.$ary\['val'\];

//PDO $pdo = new PDO('mysql:dbname=db\_Name;localhost', 'user', 'db\_password', array(PDO::MYSQL\_ATTR\_INIT\_COMMAND => 'SET NAMES utf8')); $pdo->setAttribute(PDO::ATTR\_EMULATE\_PREPARES, false); $pdo->setAttribute(PDO::ATTR\_ERRMODE, PDO::ERRMODE\_EXCEPTION);

//select $stmt = $pdo->prepare('SELECT \* FROM tbl\_name WHERE description LIKE :weather'); $stmt->execute(array('weather' => $weather)); $getAllData = $stmt->fetchAll(); foreach ($getAllData as $key => $value) { $tempArray\[0\] = $value\['table\_column1'\]; $tempArray\[1\] = $value\['table\_column2'\]; $tempArray\[2\] = $value\['table\_column3'\]; $tempArray\[3\] = $value\['table\_column4'\]; }

//input $stmt = $pdo->prepare('INSERT INTO \`tbl\_name\`(\`description\`) VALUE(:weather)'); $stmt->execute(array('weather' => $weather)); $InsertID = $pdo->lastInsertID(); \[/php\]

**Good to know** trust me on this one. **var\_dump()** ([http://php.net/manual/de/function.var-dump.php](http://php.net/manual/de/function.var-dump.php)) is your BEST friend. If you are not sure what a variable holds, throw it at var\_dump and it will tell you everything you need to know about the content of that variable.

\[php\]var\_dump($yourvariable);\[/php\]

Thats the most basic information you need before starting to read / see things on the internet, good luck.

I don't think php is bad and neither should you, don't listen to everything you read on the internet :)
