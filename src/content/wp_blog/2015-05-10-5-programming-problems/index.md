---
title: "5 Programming Problems"
date: "2015-05-10"
categories: 
  - "programming"
---

Hey there, I saw a post on Reddit about a job application.

[https://blog.svpino.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour](https://blog.svpino.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour)

The poster would test the candidates with 5 programming problems. While it makes sense to check if ppl actually can programm I am not so sure wether Problem 4 and 5 are good job application Problems.

I basically wanted to dip my fingers in c++ and solved the first 4 problems, problem 5 is solveable and I've tried it but didn't came up with a solution in a reasonable time.

**Warning**: It was more of a training to learn cpp, and sometimes it was written more complicated than needed because I wanted to try certain things. **All code is written in Qt Creator!**

### Problem 1

Write three functions that compute the sum of the numbers in a given list using a for-loop, a while-loop, and recursion.

My solution: \[code language="cpp"\] #include <QCoreApplication> #include <iostream>

using namespace std;

int numberSum(int\* ptrList, int size); int numberSum2(int\* ptrList, int size); int numberSum3(int\* ptrList, int size);

int main(int argc, char \*argv\[\]) { QCoreApplication a(argc, argv);

int numberList\[\] = {2, 5, 7, 3, 6, 6, 7}; int\* ptrList = numberList; int arraySize = sizeof(numberList) / sizeof(\*numberList);

cout << numberSum(ptrList, arraySize); cout << numberSum2(ptrList, arraySize); cout << numberSum3(ptrList, arraySize);

return a.exec(); }

int numberSum(int\* ptrList, int size) { int sum = 0;

for (int i = 0; i < size; i++) { sum += ptrList\[i\]; }

cout << " ok "; return sum; }

int numberSum2(int\* ptrList, int size) { int sum = 0;

do { size--; sum += ptrList\[size\]; } while (size > 0);

return sum; }

int numberSum3(int\* ptrList, int size) { int sum = 0;

sum = ptrList\[size-1\];

if (size-1 > 0) { sum += numberSum3(ptrList, size -1); }

return sum; } \[/code\]

### Problem 2

Write a function that combines two lists by alternatingly taking elements. For example: given the two lists \[a, b, c\] and \[1, 2, 3\], the function should return \[a, 1, b, 2, c, 3\]. My solution: \[code language="cpp"\] #include <QCoreApplication> #include <iostream>

using namespace std;

int main(int argc, char \*argv\[\]) { QCoreApplication a(argc, argv);

int list1\[\] = { 1, 2, 3, 4 }; char list2\[\] = { 'a', 'b', 'c', 'd' };

int size = sizeof(list1)/sizeof(\*list1) + sizeof(list2)/sizeof(\*list2); char list3\[sizeof(list1)/sizeof(\*list1) + sizeof(list2)/sizeof(\*list2)\];

int j = 0; for (int i = 0; i < size; i++) {

if (i % 2 == 0) { list3\[i\] = '0' + list1\[j\]; } else { list3\[i\] = list2\[j\]; j++; }

}

for (int i = 0; i < size; i++) { cout << list3\[i\] << ", "; }

return a.exec(); } \[/code\]

### Problem 3

Write a function that computes the list of the first 100 Fibonacci numbers. By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two. As an example, here are the first 10 Fibonnaci numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, and 34. \[code language="cpp"\] #include <QCoreApplication> #include <iostream>

using namespace std;

int main(int argc, char \*argv\[\]) { QCoreApplication a(argc, argv);

long long list\[100\] = {0, 1};

for (int i = 2; i < 100; i++) { list\[i\] = list\[i-1\] + list\[i-2\]; }

int size = sizeof(list); int i = 0; while (size > 0) { cout << list\[i\] << " "; i++; size--; }

return a.exec(); } \[/code\]

### Problem 4

Write a function that given a list of non negative integers, arranges them such that they form the largest possible number. For example, given \[50, 2, 1, 9\], the largest formed number is 95021. \[code language="cpp"\] #include <QCoreApplication> #include <iostream>

using namespace std;

void bubblesort(int\* array, int size);

int main(int argc, char \*argv\[\]) { QCoreApplication a(argc, argv);

int array\[\] = { 1, 4, 5, 7, 1, 2 }; int\* pArray = array;

//cout << sizeof(array) / sizeof(\*array); bubblesort(pArray, (sizeof(array) / sizeof(\*array)));

for (int i = 0; i < sizeof(array) / sizeof(\*array); i++) { cout << array\[i\]; } return a.exec(); }

void bubblesort(int\* array, int size) { do { int j = 1; for (int i = 0; i < size-1; i++) { if ( array\[i\] > array\[i + 1\]) { int temp = array\[i\]; array\[i\] = array\[i+1\]; array\[i+1\] = temp; j = i+1; } } size = j; } while (size > 1); } \[/code\] **Update:** Apparently this problem got a lot of people talking (although not as much as Problem 5 below.) [You can click here to read my solution](https://blog.svpino.com/2015/05/08/solution-to-problem-4).

### Problem 5

Write a program that outputs all possibilities to put + or - or nothing between the numbers 1, 2, ..., 9 (in this order) such that the result is always 100. For example: 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.

**Update:** ([Here is one solution to this problem](https://blog.svpino.com/2015/05/08/solution-to-problem-5-and-some-other-thoughts-about-this-type-of-questions) in case you are curious.)
