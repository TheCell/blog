---
title: "C++ Boost random"
date: "2016-03-26"
categories: 
  - "allgemein"
---

This post is a short one explaining the boost::random with fixed seed and with variable seed. First of all let me explain how it works. You use an random engine that is initialized with a seed. After that you have your distribution object (here I use uniform integer distribution) where you set the min max range. Note that the max number is included so you get numbers from 0 to and including 9 here. Now you just pass the generator to the distribution object and it will spit out a number. The numbers are deterministic meaning if you restart your programm with the same seed the sequence will be the same every time. To get a random number you just pass the generator to the distribution again and it will give you the next number in the sequence. If you want to have different numbers every startup you have to include some variables in your seed that change every time. Like the actual time. This is done in the first example when you pass the seed 0.

\[cpp\] #include "boost/random/mersenne\_twister.hpp" #include "boost/random/uniform\_int\_distribution.hpp" #include <ctime>

int getGeneratedNumber(int seed) { int randomNumber = 0;

if (seed == 0) { time\_t rawtime = time(0); seed = rawtime; }

Sudokugenerator::usedSeed = seed; boost::random::mt11213b randomgen(seed); boost::random::uniform\_int\_distribution<> dist(0,9);

randomNumber = dist(randomgen);

return randomNumber; } \[/cpp\]

If you don't care about everything and just want random numbers every time you call a function this one might be for you. Note that this will return always the same numbers when restarting the programm. If you don't want that you have to initialize the randomgenerator with a variable seed, explained in the first example.

\[cpp\] #include "boost/random/mersenne\_twister.hpp" #include "boost/random/uniform\_int\_distribution.hpp"

// global const for demo purpose boost::random::mt11213b RANDOMGEN(seed)

int getNumber() { int randomNumber = 0; boost::random::uniform\_int\_distribution<> dist(0,9); randomNumber = dist(RANDOMGEN); return randomNumber; } \[/cpp\]
