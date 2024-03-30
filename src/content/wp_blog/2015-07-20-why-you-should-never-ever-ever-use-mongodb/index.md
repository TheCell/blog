---
title: "Why you should never, ever, ever use MongoDB"
date: "2015-07-20"
categories: 
  - "programming"
---

MongoDB is evil. It...

... loses data ... in fact, for a long time, ignored errors by default and assumed every single write succeeded no matter what (which on 32-bits systems led to losing all data silently after some 3GB, due to MongoDB limitations) ... is slow, even at its advertised usecases, and claims to the contrary are completely lacking evidence ... forces the poor habit of implicit schemas in nearly all usecases ... has locking issues ... has an atrociously poor response time to security issues - it took them two years to patch an insecure default configuration that would expose all of your data to anybody who asked, without authentication ... is not ACID-compliant ... is a nightmare to scale and maintain ... isn't even exclusive in its offering of JSON-based storage; PostgreSQL does it too, and other (better) document stores like CouchDB have been around for a long time

Please read the full article with source on every statement on: [http://cryto.net/~joepie91/blog/2015/07/19/why-you-should-never-ever-ever-use-mongodb/](http://cryto.net/~joepie91/blog/2015/07/19/why-you-should-never-ever-ever-use-mongodb/)
