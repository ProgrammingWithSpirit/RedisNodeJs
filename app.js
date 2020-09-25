var Redis = require("ioredis");
var redis = new Redis(6380);

redis.set("color", "blue");
redis.get("color", function(_err, result) {
    console.log("Color before changes ", result);
});

redis.set("color", "red");
redis.get("color").then(function(result) {
    console.log("Color after ", result);
});

redis.set("weight", 100, "EX", 1);
redis.get("weight").then(function(result) {
    console.log("Weight before expiration ", result);
});

setTimeout(function() {
    redis.get("weight").then(function(result) {
        console.log("Weight after expiration ", result);
    });
}, 2000);

redis.del("color");
redis.get("color").then(function(result) {
    console.log("Color after deletion ", result);
});

redis.hset("banana", "weight", 10);
redis.hget("banana", "weight").then(function(result) {
    console.log("Hash ", result);
});

redis.sadd("my set", 1, 2, 3, 4, 5);
redis.smembers("my set").then(function(result) {
    console.log("Set ", result);
});