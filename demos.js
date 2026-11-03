/* Errand — the 20 demo helpers.
   Each demo drives: its landing card, demo.html?d=id, the builder (steps), try-it and live pages.
   watch.kind: thread (sms | call | chat | whatsapp), email, ledger, post.
   Thread lines: [who, text, didLine?] — who: a = helper, c = customer/other person, o = owner. */

const CATS = {
  money:     { label: 'Money',      tint: '#E6EEE2', ink: '#2F5A3A' },
  sales:     { label: 'Sales',      tint: '#F5E6D8', ink: '#8A4B1C' },
  marketing: { label: 'Marketing',  tint: '#ECE3F1', ink: '#5E3B76' },
  customers: { label: 'Customers',  tint: '#E0EAF4', ink: '#244B73' },
  ops:       { label: 'Operations', tint: '#F1ECDA', ink: '#6B5A1E' }
};

const DEMOS = [
  /* ---------------- MONEY ---------------- */
  {
    id: 'bookkeeper', photo: 'assets/bakery.jpg', why: 'The books pile up until tax time, and fixing them then costs far more.', cat: 'money', role: 'Bookkeeper', name: 'Penny',
    biz: 'Linden Street Bakery', owner: 'Maria', ownerFull: 'Maria Alvarez',
    prompt: "Keep my books up to date. Sort every bank transaction, match the receipts in my email, and send me a simple profit report each month.",
    summary: 'Sorts every transaction into the right category, matches receipts, and closes the month for you.',
    teaser: 'Sorted 38 transactions. 2 need you.',
    setupTime: 'About 4 minutes',
    steps: ['bank', 'accounting', 'email', 'you', 'rules'],
    learn: [],
    rules: ['Asks you about anything over $500 it can\'t place', 'Never moves money; it can only read your bank', 'Sends your accountant the monthly report on the 5th', 'Flags any charge that looks like a duplicate'],
    watch: { kind: 'ledger', title: 'Linden Street Bakery, this week',
      rows: [
        ['Nov 2', 'RESTAURANT DEPOT #114', '-$412.80', 'Ingredients', 'ok'],
        ['Nov 2', 'SQUARE DEPOSIT', '+$1,962.45', 'Sales', 'ok'],
        ['Nov 3', 'PG&E UTILITY', '-$318.22', 'Utilities', 'ok'],
        ['Nov 3', 'AMZN MKTP US', '-$89.99', 'Supplies (receipt matched)', 'ok'],
        ['Nov 4', 'SQUARE DEPOSIT', '+$2,104.10', 'Sales', 'ok'],
        ['Nov 4', 'VENMO *J ORTIZ', '-$650.00', 'Needs you: who is this?', 'ask']
      ],
      did: ['Sorted 6 transactions into your categories', 'Matched an Amazon receipt from your email', 'Texted Maria about one $650 payment it couldn\'t place'] },
    next: ['Sorts new transactions every morning', 'Texts you only when something needs a decision', 'Sends a one-page profit report on the 1st']
  },
  {
    id: 'invoices', photo: 'assets/plumber.jpg', why: 'Slow payers mean months of awkward follow-ups. Owners rank chasing payments among their least favorite jobs.', cat: 'money', role: 'Invoice chaser', name: 'Max',
    biz: 'Okafor Plumbing', owner: 'Chidi', ownerFull: 'Chidi Okafor',
    prompt: "Send my invoices after every job and politely chase anyone who hasn't paid. Text them a link so they can pay by card.",
    summary: 'Sends invoices, follows up kindly, and texts a pay-by-card link until you\'re paid.',
    teaser: 'Collected $3,240 this week.',
    setupTime: 'About 3 minutes',
    steps: ['accounting', 'payments', 'email', 'you', 'rules'],
    rules: ['Waits 7 days before the first reminder', 'Stays friendly; never mentions late fees unless you say so', 'Asks you before reminding anyone a third time', 'Stops chasing the moment someone pays'],
    watch: { kind: 'email', title: 'Invoice #1042, 9 days overdue',
      from: 'Max at Okafor Plumbing', to: 'Janet Hughes', subject: 'Quick reminder: invoice #1042 ($385)',
      body: ['Hi Janet,', 'Just a friendly reminder that invoice #1042 for the kitchen sink repair on Oct 24 is still open. You can pay by card here in about a minute:', '[ Pay $385 securely ]', 'Thanks again for choosing Okafor Plumbing!', 'Max, on behalf of Chidi'],
      replies: [
        ['c', 'Janet Hughes', 'So sorry, totally slipped my mind. Paying now.'],
        ['a', 'Max', 'No problem at all, Janet. Payment received. Thank you! A receipt is on its way.', 'Got paid $385 by card and sent a receipt']
      ],
      did: ['Sent a friendly reminder on day 9', 'Included a one-tap card payment link', 'Marked invoice #1042 paid in QuickBooks'] },
    next: ['Sends each invoice the moment you finish a job', 'Reminds on day 7 and day 14', 'Texts you a weekly "who still owes" list']
  },
  {
    id: 'receipts', photo: 'assets/landscape.jpg', why: 'Receipts get lost in trucks and pockets, and every missing one is a deduction gone.', cat: 'money', role: 'Receipt catcher', name: 'Ruby',
    biz: 'Greenway Landscaping', owner: 'Tom', ownerFull: 'Tom Becker',
    prompt: "When I text you a photo of a receipt, file it in QuickBooks with the right job and category. Remind me if I forget to send receipts.",
    summary: 'Text it a photo of any receipt. It reads it, files it, and ties it to the right job.',
    teaser: 'Filed 14 receipts from photos.',
    setupTime: 'About 2 minutes',
    steps: ['accounting', 'you', 'rules'],
    rules: ['Asks which job when it can\'t tell', 'Keeps the photo with every expense', 'Reminds you Fridays if a card charge has no receipt'],
    watch: { kind: 'sms', title: 'Tom texting Ruby',
      lines: [
        ['o', '[Photo of a receipt]'],
        ['a', 'Got it: Home Depot, $246.18, mulch and edging. Which job is this for: Patel backyard or Lakeview HOA?', 'Read the receipt from a photo'],
        ['o', 'patel'],
        ['a', 'Filed under Patel backyard, Materials. That job has used $1,120 of its $1,800 materials budget.', 'Filed it in QuickBooks under the right job'],
        ['o', 'thanks'],
        ['a', 'Also, 2 card charges from Tuesday have no receipt yet: Shell $64.10 and Ace Hardware $18.99. Send them when you can.', 'Found 2 card charges with no receipt']
      ] },
    next: ['Files every receipt you text or forward', 'Ties expenses to jobs automatically', 'Nudges you each Friday about missing receipts']
  },
  {
    id: 'cashflow', photo: 'assets/boutique.jpg', why: 'Cash flow is the struggle owners bring up more than any other.', cat: 'money', role: 'Cash-flow watcher', name: 'Cora',
    biz: 'Nest & Thread', owner: 'Grace', ownerFull: 'Grace Owusu',
    prompt: "Every Monday, tell me how much cash I'll have over the next 6 weeks, and warn me early if I'm going to run short.",
    summary: 'A Monday text with your next six weeks of cash, and an early warning before a tight week.',
    teaser: 'Warned about a tight week, 3 weeks early.',
    setupTime: 'About 3 minutes',
    steps: ['bank', 'accounting', 'you', 'rules'],
    rules: ['Texts you every Monday at 8am', 'Warns you at least 2 weeks before cash drops under $5,000', 'Suggests fixes but never moves money'],
    watch: { kind: 'sms', title: 'Monday 8:00 AM',
      lines: [
        ['a', 'Good morning, Grace. Cash today: $18,420. Next 6 weeks look fine except the week of Dec 1.', 'Checked the bank and upcoming bills'],
        ['a', 'That week rent ($4,200), the holiday stock order ($9,800) and payroll land together. You\'d dip to about $2,900.', 'Spotted a tight week 4 weeks out'],
        ['o', 'what can I do'],
        ['a', 'Two easy options: ask Loomworks to split the stock order (they did last year), or move $3,000 from savings on Nov 28. Want me to email Loomworks?'],
        ['o', 'yes email them'],
        ['a', 'Sent. I\'ll tell you as soon as they answer.', 'Emailed the supplier to split the order']
      ] },
    next: ['Monday cash forecast by text', 'Early warnings, weeks ahead', 'Ideas to fix tight weeks, which you approve']
  },
  {
    id: 'tax', photo: 'assets/yoga.jpg', why: 'Deadlines sneak up, and gathering paperwork for the accountant eats whole evenings.', cat: 'money', role: 'Tax-time organizer', name: 'Theo',
    biz: 'Studio Kai', owner: 'Kai', ownerFull: 'Kai Tanaka',
    prompt: "Keep me ready for taxes. Remind me about quarterly payments, collect what my accountant needs, and send it to her in one tidy package.",
    summary: 'Tracks deadlines, gathers the paperwork, and hands your accountant a tidy package.',
    teaser: 'Sent the year-end package to the accountant.',
    setupTime: 'About 3 minutes',
    steps: ['accounting', 'email', 'you', 'rules'],
    rules: ['Reminds you 10 days before each tax deadline', 'Never files anything itself; your accountant does', 'Asks before sharing documents with anyone new'],
    watch: { kind: 'email', title: 'Package for the accountant',
      from: 'Theo at Studio Kai', to: 'Dana Whitfield, CPA', subject: 'Studio Kai: year-end package (everything in one place)',
      body: ['Hi Dana,', 'Here is everything for Kai\'s year-end and the January estimated payment:', '• Profit and loss, Jan to Oct (PDF)', '• 1099 contractor list: 3 instructors, totals included', '• Mileage log: 412 miles', '• Missing: one receipt for the Sep 14 studio repair ($740). I\'ve asked Kai for it.', 'Let me know if you need anything else.', 'Theo, on behalf of Kai'],
      replies: [
        ['c', 'Dana Whitfield', 'This is perfect, thank you. Payment due should be $2,180. I\'ll send Kai the voucher.'],
        ['a', 'Theo', 'Thanks, Dana. I\'ve put the Jan 15 payment on Kai\'s calendar with a reminder on Jan 5.', 'Put the payment deadline on Kai\'s calendar']
      ],
      did: ['Gathered the P&L, contractor totals and mileage', 'Spotted a missing receipt before the accountant did', 'Sent one tidy package instead of 12 emails'] },
    next: ['Deadline reminders 10 days ahead', 'Collects documents all year', 'Sends your accountant one package per quarter']
  },

  /* ---------------- SALES ---------------- */
  {
    id: 'leads', photo: 'assets/roofer.jpg', why: 'The first business to answer usually wins the job. Leads that come in at night go cold by morning.', cat: 'sales', role: 'Lead responder', name: 'Leo',
    biz: 'Summit Roofing', owner: 'Dave', ownerFull: 'Dave Kowalski',
    prompt: "When someone fills out the form on my website, text them within a minute, ask a few questions, and book a free roof inspection.",
    summary: 'Answers every new lead within a minute, asks the right questions, and books the visit.',
    teaser: 'Booked 4 inspections overnight.',
    setupTime: 'About 4 minutes',
    steps: ['website', 'phone', 'calendar', 'you', 'rules'],
    learn: ['Found your service area: 25 miles around Denver', 'Found services: repairs, full replacement, gutters', 'Found your form: "Get a free inspection"', 'Found: free inspections, Mon to Sat'],
    rules: ['Replies to new leads within 60 seconds, day or night', 'Only books inside your service area', 'Never quotes prices; inspections first', 'Texts Dave the details of every booking'],
    number: '(720) 555-0161',
    watch: { kind: 'sms', title: 'New lead from the website, 11:48 PM',
      lines: [
        ['a', 'Hi Emily, it\'s Leo from Summit Roofing. Thanks for reaching out about your roof! Is this a leak, storm damage, or a replacement?', 'Texted the lead 38 seconds after the form'],
        ['c', 'Storm damage I think, some shingles came off yesterday'],
        ['a', 'Sorry to hear that. Is water coming in right now, or just missing shingles?'],
        ['c', 'Just missing shingles'],
        ['a', 'Good. Dave can come for a free inspection tomorrow at 9 or 1. Which works?', 'Asked the 2 questions Dave always asks'],
        ['c', '9 please'],
        ['a', 'You\'re booked for 9am tomorrow at 4410 Elm Ct. Dave will text when he\'s on the way.', 'Booked the inspection and told Dave']
      ] },
    next: ['Answers website leads within a minute, 24/7', 'Books inspections on your calendar', 'Texts you every new booking']
  },
  {
    id: 'coldcall', photo: 'assets/cleaning.jpg', why: "Owners know they should be finding new customers, but there's never time between jobs.", cat: 'sales', role: 'Cold caller', name: 'Carter',
    biz: 'Bright Office Cleaning', owner: 'Andre', ownerFull: 'Andre Baptiste',
    prompt: "Call offices near me, find out who handles cleaning, and book a short walkthrough with me when they're interested.",
    summary: 'Calls businesses on your list, finds the decision maker, and books walkthroughs.',
    teaser: 'Made 60 calls, booked 3 walkthroughs.',
    setupTime: 'About 5 minutes',
    steps: ['website', 'contacts', 'phone', 'voice', 'calendar', 'you', 'rules'],
    learn: ['Found services: nightly office cleaning, deep cleans, windows', 'Found area: downtown and Midtown Atlanta', 'Found your selling point: insured, same crew every night'],
    contacts: 'calls',
    rules: ['Says up front that it\'s an AI assistant calling for Andre', 'Calls businesses only, never homes', 'Checks the Do Not Call list before every call', 'Calls only on weekdays, 9am to 5pm', 'Takes "no" the first time and removes the number'],
    number: '(404) 555-0136',
    watch: { kind: 'call', title: 'Calling Peachtree Dental, 10:14 AM',
      lines: [
        ['c', 'Peachtree Dental, this is Gloria.'],
        ['a', 'Hi Gloria, I\'m Carter, an AI assistant calling for Andre at Bright Office Cleaning. Is now an okay time for a quick question?', 'Said it was an AI assistant right away'],
        ['c', 'Sure, quickly.'],
        ['a', 'Who looks after cleaning for your office? Andre is offering free walkthroughs to offices on Peachtree this month.'],
        ['c', 'That\'s me actually. Our current company keeps missing nights.'],
        ['a', 'That\'s exactly what Andre fixes: the same insured crew every night. Could he stop by Thursday at 4 for 15 minutes?', 'Found the decision maker and the pain'],
        ['c', 'Thursday at 4 works.'],
        ['a', 'Great. You\'ll get a text confirmation with Andre\'s number. Thanks, Gloria!', 'Booked a walkthrough on Andre\'s calendar']
      ] },
    next: ['Calls your list on weekdays, 9 to 5', 'Books walkthroughs on your calendar', 'Sends you a daily call report']
  },
  {
    id: 'coldemail', photo: 'assets/design.jpg', why: "Outreach only works when it's personal, and personal takes hours nobody has.", cat: 'sales', role: 'Email prospector', name: 'Iris',
    biz: 'Pixel & Pine Studio', owner: 'Jonah', ownerFull: 'Jonah Reed',
    prompt: "Find local restaurants with outdated websites, write each one a short personal email about what I could improve, and follow up once.",
    summary: 'Finds good-fit businesses, writes personal emails, and follows up once. Replies go to you.',
    teaser: '3 replies from 40 personal emails.',
    setupTime: 'About 4 minutes',
    steps: ['website', 'contacts', 'email', 'you', 'rules'],
    learn: ['Found your services: websites and online ordering for restaurants', 'Found 6 case studies to mention', 'Found your price range: from $2,500'],
    contacts: 'find',
    rules: ['Sends no more than 20 emails a day, from your address', 'Writes every email for that one business; no templates', 'Follows up once, then stops', 'Includes an easy way to opt out', 'Shows you the first 5 emails before sending'],
    watch: { kind: 'email', title: 'Personal email to Casa Lupe',
      from: 'Jonah Reed', to: 'Lupe Ramirez, Casa Lupe', subject: 'Your online menu (a quick idea)',
      body: ['Hi Lupe,', 'I had your mole enchiladas last month. Amazing. I noticed your website menu is a PDF that\'s hard to read on a phone, and there\'s no way to order pickup online.', 'We helped Taqueria Sol add phone-friendly ordering last spring; their pickup orders doubled in two months.', 'Would a 15-minute chat next week be useful? Happy to sketch an idea for free.', 'Jonah, Pixel & Pine Studio', 'If this isn\'t useful, just reply "no thanks" and I won\'t write again.'],
      replies: [
        ['c', 'Lupe Ramirez', 'Funny timing, my daughter has been telling me the same thing. Tuesday afternoon?'],
        ['a', 'Iris', 'Passed to Jonah with a summary. He booked Tuesday at 3pm and sent Lupe an invite.', 'Handed a warm reply to Jonah']
      ],
      did: ['Found the restaurant and a real problem on its site', 'Wrote a personal email from Jonah\'s address', 'Passed the reply straight to Jonah'] },
    next: ['Finds 20 good-fit businesses a day', 'Shows you the first emails before sending', 'Sends warm replies straight to you']
  },
  {
    id: 'quotes', photo: 'assets/landscape-2.jpg', why: 'Writing quotes eats the evenings after a full day of work.', cat: 'sales', role: 'Quote writer', name: 'Quinn',
    biz: 'Greenway Landscaping', owner: 'Tom', ownerFull: 'Tom Becker',
    prompt: "When a customer texts photos of their yard, ask what they want, write a quote from my price list, and send it once I approve.",
    summary: 'Turns a few photos and questions into a clear quote from your own price list.',
    teaser: 'Wrote 5 quotes from photos today.',
    setupTime: 'About 4 minutes',
    steps: ['website', 'phone', 'accounting', 'you', 'rules'],
    learn: ['Found your price list: mowing, mulch, edging, cleanups, sod', 'Found your minimum job: $150', 'Found your area: north suburbs of Minneapolis'],
    rules: ['Uses only prices from your price list', 'Shows you every quote before it goes out', 'Adds 10% when the photos show a slope', 'Quotes are good for 30 days'],
    number: '(612) 555-0119',
    watch: { kind: 'sms', title: 'A new customer texting Greenway',
      lines: [
        ['c', '[3 photos of a backyard] Hi, how much to clean this up and put down mulch?'],
        ['a', 'Hi! This is Quinn from Greenway. Nice yard. Roughly how many beds do you want mulched, all 3 along the fence?', 'Looked at the photos'],
        ['c', 'Yes all 3, and edge them'],
        ['a', 'Got it. I\'ll have a quote for you within the hour.'],
        ['a', '(To Tom) Quote ready: cleanup $180, mulch 4 yards $340, edging $120. Total $640. Send it?', 'Built a $640 quote from the price list'],
        ['o', 'send'],
        ['a', 'Here\'s your quote for $640, good for 30 days. Tap to accept and pick a day: [View quote]', 'Sent the quote after Tom said yes']
      ] },
    next: ['Answers photo requests within minutes', 'Prices from your own list', 'Sends quotes only after your OK']
  },
  {
    id: 'followup', photo: 'assets/painter.jpg', why: "Most quotes aren't lost to a no. They're lost to silence.", cat: 'sales', role: 'Quote follow-up', name: 'Fern',
    biz: 'Coastline Painting', owner: 'Rob', ownerFull: 'Rob Delgado',
    prompt: "Follow up on every quote I send that hasn't been accepted. Check in after 3 days, answer questions, and let me know who's ready.",
    summary: 'Checks in on open quotes, answers questions, and tells you who\'s ready to book.',
    teaser: 'Revived 2 quotes worth $9,400.',
    setupTime: 'About 3 minutes',
    steps: ['accounting', 'email', 'phone', 'you', 'rules'],
    rules: ['Checks in 3 days and 10 days after a quote', 'Can offer to start sooner, never a lower price', 'Hands the conversation to Rob when someone wants to talk price'],
    number: '(805) 555-0172',
    watch: { kind: 'sms', title: 'Day 3 after a $6,200 quote',
      lines: [
        ['a', 'Hi Mark, it\'s Fern from Coastline Painting. Any questions about the exterior quote Rob sent on Monday?', 'Checked in 3 days after the quote'],
        ['c', 'We liked it. Wondering if you can start before Thanksgiving?'],
        ['a', 'Rob has an opening Nov 17 to 20, so you\'d be done before the holiday. Want me to hold those days?'],
        ['c', 'Yes!'],
        ['a', 'Done. Here\'s the link to accept and pay the 20% deposit: [Accept quote]. I\'ll let Rob know.', 'Turned an open quote into a booked job'],
      ] },
    next: ['Follows up on every open quote', 'Answers common questions', 'Tells you who is ready to book']
  },

  /* ---------------- MARKETING ---------------- */
  {
    id: 'newsletter', photo: 'assets/bakery-2.jpg', why: 'Marketing is the first thing dropped when the day gets busy.', cat: 'marketing', role: 'Newsletter writer', name: 'Nora',
    biz: 'Linden Street Bakery', owner: 'Maria', ownerFull: 'Maria Alvarez',
    prompt: "Write a short email newsletter every month about what's new at the bakery and our specials, and send it to my customer list after I approve it.",
    summary: 'Writes a monthly newsletter in your voice from what\'s actually happening, and sends after your OK.',
    teaser: 'Drafted November\'s newsletter.',
    setupTime: 'About 3 minutes',
    steps: ['website', 'social', 'contacts', 'you', 'rules'],
    learn: ['Found your menu and seasonal items', 'Read your last 3 newsletters to learn your voice', 'Found holiday pre-order dates on your site'],
    contacts: 'list',
    rules: ['Sends only to people who signed up', 'Always shows you the draft first', 'Keeps it under 150 words with one photo', 'Sends on the first Tuesday of the month, 7am'],
    watch: { kind: 'email', title: 'Draft for Maria to approve',
      from: 'Linden Street Bakery', to: '1,248 subscribers', subject: 'Pie season is here (and pre-orders open Friday)',
      body: ['Hi neighbors,', 'November smells like cinnamon around here. Our pumpkin and apple-cranberry pies are back, and Thanksgiving pre-orders open this Friday at 7am. Last year they sold out in 3 days.', 'New this month: Maria\'s abuela\'s conchas, Saturdays only.', '[ Pre-order a pie ]', 'See you at the counter,', 'Maria and the Linden Street crew'],
      replies: [
        ['o', 'Maria', 'Love it. Add that we\'re closed Thanksgiving day.'],
        ['a', 'Nora', 'Added. Scheduled for Tuesday 7am to 1,248 subscribers. I\'ll send you the open rate Wednesday.', 'Scheduled the newsletter after Maria approved']
      ],
      did: ['Wrote it in Maria\'s voice from her real specials', 'Got Maria\'s approval and her one change', 'Scheduled it for the best send time'] },
    next: ['Drafts each newsletter a week ahead', 'Sends only after your approval', 'Reports opens and clicks the next day']
  },
  {
    id: 'social', photo: 'assets/salon.jpg', why: 'Posting every day feels like a second job on top of the real one.', cat: 'marketing', role: 'Social media poster', name: 'Sofia',
    biz: 'Bella Salon', owner: 'Tasha', ownerFull: 'Tasha Greene',
    prompt: "When I text you photos of my work, write a nice Instagram and Facebook post and publish it at a good time after I say OK.",
    summary: 'Text it photos of your work. It writes the post, picks the time, and publishes after your OK.',
    teaser: 'Posted 3 times this week.',
    setupTime: 'About 3 minutes',
    steps: ['social', 'you', 'rules'],
    rules: ['Never posts without your OK', 'Asks before showing a client\'s face', 'Uses 3 to 5 hashtags, never more', 'Posts between 6 and 8pm, when your followers are online'],
    watch: { kind: 'post', title: 'From a photo Tasha texted',
      caption: 'Fall copper, done right. Warm, glossy and low-maintenance: Rachel wanted a change that grows out gracefully, and we think we nailed it. Book your fall color: link in bio.',
      tags: '#copperhair #fallcolor #bellasalon #balayage',
      handle: 'bellasalon.studio',
      lines: [
        ['o', '[Photo] rachel\'s copper today'],
        ['a', 'Gorgeous! Here\'s a post for Instagram and Facebook. Rachel said yes to photos in her intake form. Post tonight at 7?', 'Wrote the caption and checked photo consent'],
        ['o', 'yes'],
        ['a', 'Scheduled for 7pm on both. I\'ll send you how it did tomorrow.', 'Scheduled on Instagram and Facebook']
      ] },
    next: ['Turns your photos into posts', 'Posts at the best time after your OK', 'Weekly note on what got the most likes']
  },
  {
    id: 'reviews', photo: 'assets/pizza.jpg', why: 'Reviews decide who gets the call, but asking for them feels awkward.', cat: 'marketing', role: 'Review getter', name: 'Remy',
    biz: "Rossi's Pizzeria", owner: 'Tony', ownerFull: 'Tony Rossi',
    prompt: "Ask happy customers to leave us a Google review, and reply to every review we get, good or bad, in a warm way.",
    summary: 'Asks happy customers for reviews and replies to every review in your voice.',
    teaser: '11 new 5-star reviews this month.',
    setupTime: 'About 3 minutes',
    steps: ['reviews', 'contacts', 'you', 'rules'],
    contacts: 'list',
    rules: ['Asks only customers who agreed to texts', 'Asks once, the day after their order', 'Shows you any reply to a review under 4 stars first', 'Never offers anything in exchange for a review'],
    watch: { kind: 'sms', title: 'A review, then a reply',
      lines: [
        ['a', 'Hi Sam, thanks for ordering from Rossi\'s last night! If you enjoyed it, a quick Google review would mean a lot to Tony: [Leave a review]', 'Asked a happy customer for a review'],
        ['c', 'Done! The garlic knots are unreal'],
        ['a', '(Reply posted on Google) "Thank you, Sam! Tony\'s nonna would be proud of those knots. See you next Friday." ', 'Replied to the new 5-star review'],
        ['a', '(To Tony) A 2-star review mentions a 70-minute delivery Saturday. Here\'s my draft reply with an apology and a free dessert offer. Post it?', 'Drafted a careful reply to a bad review'],
        ['o', 'post it'],
      ] },
    next: ['Asks for reviews the day after an order', 'Replies to every review', 'Shows you tough replies before posting']
  },
  {
    id: 'winback', photo: 'assets/salon.jpg', why: 'Bringing back a regular is cheaper than finding a new customer, but nobody has time to notice who drifted away.', cat: 'marketing', role: 'Win-back helper', name: 'Willa',
    biz: 'Bella Salon', owner: 'Tasha', ownerFull: 'Tasha Greene',
    prompt: "Find clients who haven't been in for 3 months and send them a friendly personal text inviting them back, with an easy way to book.",
    summary: 'Finds clients who drifted away and invites them back with a personal note.',
    teaser: 'Brought back 9 clients in October.',
    setupTime: 'About 3 minutes',
    steps: ['contacts', 'calendar', 'phone', 'you', 'rules'],
    contacts: 'list',
    rules: ['Texts only clients who agreed to messages', 'One invite, one gentle reminder, then stops', 'Mentions their usual service and stylist', 'Offers a discount only if you turn it on'],
    number: '(312) 555-0147',
    watch: { kind: 'sms', title: 'Lauren, last visit 14 weeks ago',
      lines: [
        ['a', 'Hi Lauren, it\'s Willa from Bella Salon. Tasha was thinking of you; it\'s been a while since your last highlights! Want me to find you a time with her?', 'Wrote a personal note using her history'],
        ['c', 'Omg yes I\'m overdue. Weekends?'],
        ['a', 'Tasha has Saturday Nov 15 at 10am or 1pm. Which is better?'],
        ['c', '10'],
        ['a', 'You\'re booked: Saturday Nov 15, 10am, highlights with Tasha. See you then!', 'Booked a returning client']
      ] },
    next: ['Checks for drifting clients every week', 'Sends personal invites', 'Books them straight into your calendar']
  },
  {
    id: 'gprofile', photo: 'assets/pizza-2.jpg', why: 'Wrong hours online send customers to a locked door.', cat: 'marketing', role: 'Google profile keeper', name: 'Gus',
    biz: "Rossi's Pizzeria", owner: 'Tony', ownerFull: 'Tony Rossi',
    prompt: "Keep my Google listing up to date: holiday hours, a weekly post about our special, and answer the questions people ask there.",
    summary: 'Keeps your Google listing fresh: hours, weekly posts, and answers to customer questions.',
    teaser: 'Updated holiday hours in 1 text.',
    setupTime: 'About 2 minutes',
    steps: ['reviews', 'website', 'you', 'rules'],
    learn: ['Found your menu and weekly specials', 'Found your hours: Tue to Sun, 11 to 10', 'Found: delivery within 3 miles'],
    rules: ['Posts the weekly special every Monday', 'Updates hours the moment you tell it', 'Answers questions with facts from your menu only'],
    watch: { kind: 'sms', title: 'Tony texting Gus',
      lines: [
        ['o', 'gus we close at 3 on thanksgiving and closed the friday after'],
        ['a', 'Updated on Google: Thursday Nov 27, 11 to 3, and closed Friday Nov 28. Also changed it on your website banner.', 'Updated holiday hours on Google and the website'],
        ['a', 'Someone asked on your Google listing: "Do you have gluten free crust?" Your menu says yes, $3 extra, 12-inch only. I answered.', 'Answered a customer question on Google'],
        ['o', 'great. special this week is the fig and prosciutto'],
        ['a', 'Posted to Google with last week\'s photo of it. Want it on Instagram too?', 'Posted the weekly special']
      ] },
    next: ['Weekly special post every Monday', 'Hours changed with one text', 'Answers questions on your listing']
  },

  /* ---------------- CUSTOMERS ---------------- */
  {
    id: 'receptionist', photo: 'assets/shoe.jpg', why: 'Calls ring out while your hands are full, and most callers try the next business instead of leaving a message.', cat: 'customers', role: 'Phone receptionist', name: 'Rosa',
    biz: 'Moretti Shoe Repair', owner: 'Sal', ownerFull: 'Sal Moretti',
    prompt: "Answer my shop phone when I'm busy. Tell people our hours and prices, and book repair drop-offs.",
    summary: 'Answers every call, knows your hours and prices, and books appointments.',
    teaser: 'Answered 9 calls, booked 3 drop-offs.',
    setupTime: 'About 5 minutes',
    steps: ['website', 'phone', 'voice', 'calendar', 'channels', 'you', 'rules'],
    learn: ['Found your hours: Monday to Saturday, 8 to 6', 'Found 14 repair prices, from heel tips ($18) to full resoles ($65)', 'Found your address: 2210 Lorain Ave', 'Found a rule: no rush jobs on Saturdays'],
    rules: ['Gives prices as "starting at", never exact quotes', 'Never promises same-day repairs', 'Texts you right away if a customer is upset', 'Takes a message when unsure'],
    number: '(216) 555-0148',
    watch: { kind: 'call', title: 'A customer calls, 4:05 PM',
      lines: [
        ['a', 'Moretti Shoe Repair, this is Rosa. How can I help?', 'Picked up on the first ring'],
        ['c', 'Hi, how much to resole a pair of boots?'],
        ['a', 'Full resoles start at $65. Sal gives you the exact price when he sees them. Would you like to bring them in?', 'Gave a starting price, not a promise'],
        ['c', 'Yeah, Thursday morning?'],
        ['a', 'Thursday at 10 is open. Can I have your name?'],
        ['c', 'Dana.'],
        ['a', 'Thanks, Dana. You\'re booked Thursday at 10. I\'ll text you a reminder the day before.', 'Booked Dana and sent a confirmation text']
      ] },
    next: ['Answers calls and texts day and night', 'Books drop-offs on your calendar', 'Texts you a summary at 6pm']
  },
  {
    id: 'support', photo: 'assets/boutique-2.jpg', why: 'The same handful of questions arrive all day, every day.', cat: 'customers', role: 'Inbox and chat helper', name: 'Ivy',
    biz: 'Nest & Thread', owner: 'Grace', ownerFull: 'Grace Owusu',
    prompt: "Answer customer emails and the chat on my online shop. Look up orders, handle returns by my policy, and send me anything unusual.",
    summary: 'Answers order questions, handles returns by your rules, and passes you the unusual ones.',
    teaser: 'Answered 46 questions, 2 sent to you.',
    setupTime: 'About 4 minutes',
    steps: ['website', 'shop', 'email', 'channels', 'you', 'rules'],
    learn: ['Found your return policy: 30 days, unworn, free exchanges', 'Found shipping times: 3 to 5 business days', 'Found 220 products and their care instructions'],
    rules: ['Follows your return policy exactly', 'Refunds up to $75 on its own; asks you above that', 'Hands you anything about a damaged or lost package', 'Replies within 5 minutes during the day'],
    watch: { kind: 'chat', title: 'Chat on nestandthread.com',
      lines: [
        ['c', 'Hi, where is my order? It\'s been a week'],
        ['a', 'Hi! Let me look. Is this order #4471 for the linen throw, shipped to Austin?', 'Found the order in Shopify'],
        ['c', 'Yes'],
        ['a', 'It\'s with UPS and arrives tomorrow by 8pm. Here\'s the tracking link. Sorry for the wait; holiday volume slowed things down.', 'Checked the tracking'],
        ['c', 'Ok thanks. Can I swap the color if I don\'t like it?'],
        ['a', 'Of course. Exchanges are free within 30 days. Just reply here and I\'ll send a prepaid label.', 'Answered from the return policy']
      ] },
    next: ['Answers chat and email in minutes', 'Handles returns by your policy', 'Sends you only the unusual ones']
  },
  {
    id: 'appointments', photo: 'assets/dog.jpg', why: 'No-shows leave empty chairs that can never be sold again.', cat: 'customers', role: 'Booking and reminders', name: 'Bea',
    biz: 'Paws & Claws Grooming', owner: 'Lin', ownerFull: 'Lin Chen',
    prompt: "Book grooming appointments by text, send reminders the day before, and fill the spot when someone cancels.",
    summary: 'Books by text, sends reminders, and fills last-minute cancellations from a waitlist.',
    teaser: 'Filled 2 cancellations from the waitlist.',
    setupTime: 'About 4 minutes',
    steps: ['website', 'phone', 'calendar', 'contacts', 'you', 'rules'],
    learn: ['Found services: bath, full groom, nails, de-shedding', 'Found prices by dog size', 'Found hours: Tue to Sat, 8 to 4'],
    contacts: 'list',
    rules: ['Reminds clients the day before at 10am', 'Offers cancelled spots to the waitlist first', 'Asks about behavior notes for new dogs'],
    number: '(503) 555-0128',
    watch: { kind: 'sms', title: 'A cancellation at 7:40 AM',
      lines: [
        ['c', 'Hi so sorry, Bentley is sick, need to cancel today 11am'],
        ['a', 'Oh no, feel better Bentley! Cancelled. Want me to rebook for next week?', 'Cancelled kindly and offered to rebook'],
        ['c', 'Yes next Tuesday same time'],
        ['a', 'Done: Tuesday Nov 11 at 11am.'],
        ['a', '(To the waitlist) Hi Mia! A spot opened today at 11 for Pepper\'s full groom. Want it?', 'Offered the spot to the waitlist'],
        ['c', 'YES we\'ll be there'],
        ['a', 'Booked! See you and Pepper at 11.', 'Filled the cancelled spot in 6 minutes']
      ] },
    next: ['Books appointments by text', 'Day-before reminders', 'Fills cancellations from your waitlist']
  },

  /* ---------------- OPERATIONS ---------------- */
  {
    id: 'inventory', photo: 'assets/pizza-3.jpg', why: 'Order too much and cash sits on a shelf. Order too little and you run out on Saturday.', cat: 'ops', role: 'Supply reorderer', name: 'Otto',
    biz: "Rossi's Pizzeria", owner: 'Tony', ownerFull: 'Tony Rossi',
    prompt: "Keep track of what we're running low on from my sales, and email my suppliers to reorder after I say OK.",
    summary: 'Watches what you sell, predicts what runs low, and drafts orders for your OK.',
    teaser: 'Drafted 2 orders before the weekend rush.',
    setupTime: 'About 4 minutes',
    steps: ['shop', 'email', 'you', 'rules'],
    rules: ['Never orders without your OK', 'Orders by Wednesday so supplies arrive before the weekend', 'Uses your usual supplier for each item', 'Tells you when a price goes up'],
    watch: { kind: 'email', title: 'Order to your supplier',
      from: "Otto at Rossi's Pizzeria", to: 'Orders, Sorrento Foods', subject: "Rossi's Pizzeria: order for Friday delivery",
      body: ['Hello,', 'Please deliver Friday morning to 88 Grand St:', '• 00 flour, 50 lb: 6 bags', '• Whole milk mozzarella, 5 lb: 12', '• San Marzano tomatoes, case: 4', 'Same account as usual. Please confirm.', "Otto, for Tony Rossi"],
      replies: [
        ['c', 'Sorrento Foods', 'Confirmed for Friday 7am. Note mozzarella is up $0.40/lb this week.'],
        ['a', 'Otto', '(To Tony) Order confirmed for Friday. Heads up: mozzarella went up 40 cents a pound.', 'Told Tony about a price increase']
      ],
      did: ['Predicted the weekend from last month\'s sales', 'Got Tony\'s OK by text', 'Sent the order and confirmed delivery'] },
    next: ['Checks stock every morning', 'Drafts orders for your OK', 'Flags supplier price changes']
  },
  {
    id: 'hiring', photo: 'assets/bakery.jpg', why: "Screening applicants takes hours away from the business you're hiring for.", cat: 'ops', role: 'Hiring screener', name: 'Hana',
    biz: 'Linden Street Bakery', owner: 'Maria', ownerFull: 'Maria Alvarez',
    prompt: "I need a weekend counter person. Post the job, call the applicants to ask my questions, and book interviews with the best ones.",
    summary: 'Posts the job, calls every applicant with your questions, and books the best ones.',
    teaser: 'Screened 18 applicants, booked 3.',
    setupTime: 'About 5 minutes',
    steps: ['website', 'phone', 'voice', 'calendar', 'you', 'rules'],
    learn: ['Found your address and hours', 'Found your pay range on a past job post: $17 to $19 an hour', 'Found what makes the bakery special: family recipes since 1987'],
    rules: ['Asks every applicant the same questions', 'Never asks about age, family, health or religion', 'Says it\'s an AI assistant at the start of each call', 'Maria makes every hiring decision'],
    number: '(415) 555-0193',
    watch: { kind: 'call', title: 'Calling an applicant',
      lines: [
        ['a', 'Hi Jordan, I\'m Hana, an AI assistant helping Linden Street Bakery with hiring. You applied for the weekend counter job. Do you have 5 minutes?', 'Said it was an AI assistant'],
        ['c', 'Yes, sure.'],
        ['a', 'The shift is Saturday and Sunday, 6am to 2pm. Does that work for you?'],
        ['c', 'Yes, I\'m a morning person.'],
        ['a', 'Great. Tell me about a time you helped a customer who was upset.'],
        ['c', 'At the coffee shop, someone\'s order was wrong twice, so I remade it myself and gave them a pastry...', 'Asked Maria\'s 4 questions'],
        ['a', 'Thank you. Maria would like to meet you. Is Thursday at 3 good?', 'Booked an interview with Maria']
      ] },
    next: ['Posts your job', 'Calls applicants with your questions', 'Books interviews; you decide']
  }
];

const demoById = id => DEMOS.find(d => d.id === id);

/* Free-text prompt → closest demo (so typed requests still get a fitting builder). */
function matchDemo(text = '') {
  const t = text.toLowerCase();
  const rules = [
    [/(bookkeep|books|categor|transaction|ledger|p&l|profit)/, 'bookkeeper'],
    [/(invoice|unpaid|chase|collect|owe)/, 'invoices'],
    [/(receipt|expense)/, 'receipts'],
    [/(cash ?flow|run short|forecast|runway)/, 'cashflow'],
    [/(tax|accountant|cpa|1099)/, 'tax'],
    [/(cold call|call (offices|businesses|leads)|dial)/, 'coldcall'],
    [/(cold email|prospect|outreach)/, 'coldemail'],
    [/(lead|form on my website|inquir)/, 'leads'],
    [/(follow ?up|hasn.t (been )?accepted)/, 'followup'],
    [/(quote|estimate)/, 'quotes'],
    [/(newsletter|email marketing|mailchimp)/, 'newsletter'],
    [/(instagram|facebook|social|post)/, 'social'],
    [/(review)/, 'reviews'],
    [/(haven.t (been|come)|win ?back|lapsed|come back)/, 'winback'],
    [/(google (listing|profile|business)|holiday hours)/, 'gprofile'],
    [/(return|order status|where is my order|chat|support|customer email)/, 'support'],
    [/(appointment|remind|no.show|cancel|booking|book)/, 'appointments'],
    [/(inventory|stock|reorder|supplier|running low)/, 'inventory'],
    [/(hire|hiring|applicant|job post|interview)/, 'hiring'],
    [/(phone|answer|call|receptionist)/, 'receptionist']
  ];
  for (const [re, id] of rules) if (re.test(t)) return demoById(id);
  return demoById('receptionist');
}
