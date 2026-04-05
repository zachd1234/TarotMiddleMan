const LZString = require('lz-string');

const dummyData = {
  username: "@zach_derhake",
  profilePic: "https://pbs.twimg.com/profile_images/1699961633532452864/3zLd3g8h_400x400.jpg",
  twitterBio: "Math + CS @ BU | Former Intern @ Wordware (YC S24)",
  aiSummary: "Based on our AI agent's analysis of your tweets, you are a ~mid-20s male founder/builder type who is chronically online, deeply embedded in the AI/dev tools rabbit hole, and the kind of guy who built his mom a betting pool app and somehow thinks that counts as a heartwarming origin story.",
  shortSummary: "CHRONIC REBRANDING ADDICT",
  cards: [
    {
      name: "The Algo Spin",
      text: "You built your mom a spreadsheet replacement for an Olympics betting pool and let @wabi tweet about it like it was a Series A announcement. You're hanging out at Founders Inc. with \"the boys,\" dropping \"let's gooooo\" energy, and casually asking what the best terminal coding agent is — not because you need it, but because the next thing is always the point. The ambition is real, the momentum is real, but the destination is a mystery even to you.",
      verdict: "YOU ARE MOVING VERY FAST TOWARD A FINISH LINE YOU HAVE NOT YET DECIDED ON. YOU'RE SPINNING EVERY PLATE AT ONCE AND CALLING IT A STRATEGY — THE ALGO LOVES YOU FOR IT, YOUR ROADMAP DOES NOT."
    },
    {
      name: "The Podcaster",
      text: "Between hyping Claude Code, asking about terminal coding agents, and theorizing about sub-agents minimizing context windows, you're not building one thing, you're spinning the algo on every thing. You replied to @thepablohansen twice — once to call his work \"the next evolution of coding agents\" and once just to say \"Congrats Pablo!\" — because you understand that engagement is infrastructure.",
      verdict: "ENGAGEMENT IS INFRASTRUCTURE, BUT CONTENT IS NOT COMMITMENT."
    },
    {
      name: "Forbes 30U30 (Jail)",
      text: "The pattern is clear: you're bouncing between AI tool discourse, founder networking, and dropping \"Zero to One is my favorite startup book\" like it's a personality trait. You have momentum. Real momentum. But if someone asked you to write a two-sentence mission statement for what you're actually building, you'd pivot to explaining why chatbots have no borders.",
      verdict: "A WARNING: DON'T CONFUSE MOTION WITH PROGRESS."
    }
  ]
};

const jsonString = JSON.stringify(dummyData);

// 2. Compress the string into a URL-safe Base64 string!
const compressed = Buffer.from(jsonString).toString('base64url');

console.log("-----------------------------------------");
console.log("Generated Link:");
const rawUsername = dummyData.username.replace('@', '').toLowerCase();
const username = encodeURIComponent(rawUsername);
console.log(`http://localhost:3000/t/${username}/${compressed}`);
console.log("-----------------------------------------");
