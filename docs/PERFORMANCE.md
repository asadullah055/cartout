# ওয়েবসাইটের গতি ও ডেপ্লয়মেন্ট

হোম পেজের প্রথম ১০টি প্রোডাক্ট server-এ render হয়ে পেজের HTML-এর সঙ্গে আসে।
পেজটি প্রতি ৩০ সেকেন্ডের ব্যবধানে প্রয়োজন অনুযায়ী নতুন করে তৈরি হয়। Banner ও
প্রোডাক্টের request একই সময়ে চলে। প্রোডাক্টের জন্য tag-ভিত্তিক Next.js data cache-এর
মেয়াদ ৩০ সেকেন্ড; banner ও category menu-এর জন্য ৩০০ সেকেন্ড। Browser থেকে
`/api/catalog/products` ও `/api/catalog/categories` ব্যবহার করা হয়। ফলে পরের পাতার
প্রোডাক্ট ও category menu একই cache ব্যবহার করতে পারে। Checkout বা ব্যক্তিগত
তথ্যের request এই cache-এ রাখা হয় না।

প্রোডাক্ট কার্ডে `srcset` ব্যবহার করে Cloudinary থেকে প্রয়োজন অনুযায়ী ১৬০, ৩২০ বা
৬৪০ পিক্সেলের ছোট ছবি আনা হয়। পর্দার নিচের ছবিগুলো প্রয়োজনের কাছাকাছি সময়ে লোড হয়
(lazy loading); প্রথম দুটি কার্ডের ছবি সঙ্গে সঙ্গে লোড হয়। প্রোডাক্টের প্রতিটি
details page আগে থেকেই স্বয়ংক্রিয়ভাবে ডাউনলোড করা হয় না। Scroll করলে বা
`Load more products` বাটনে চাপলে পরের পাতার প্রোডাক্ট আসে। পেজে JavaScript চালু
হওয়ার সময় প্রথম পাতার প্রোডাক্ট আবার fetch করা হয় না।

## ডেপ্লয় করার ধাপ

1. `server` ফোল্ডারের backend এবং `cartout` ফোল্ডারের frontend deploy করুন।
   দুটি প্রজেক্টেই Node.js 24 ব্যবহার করুন, যা তাদের বর্তমান `package.json`-এর
   `engines` অংশে উল্লেখ করা আছে।
2. Frontend-এর `NEXT_PUBLIC_API_URL` environment variable-এ backend-এর `/api` URL দিন।
3. নিরাপদভাবে এলোমেলো একটি secret তৈরি করে দুই প্রজেক্টের
   `CATALOG_REVALIDATE_SECRET` environment variable-এ একই মান দিন। এটি শুধু server-এর
   জন্য গোপন মান; এর নামের শুরুতে কখনো `NEXT_PUBLIC_` যোগ করবেন না।
4. Backend-এর `STOREFRONT_REVALIDATE_URL` environment variable-এর মান দিন:
   `https://www.cartout.com.bd/api/catalog/revalidate`।
5. প্রোডাক্ট, banner, category বা inventory-এর পরিবর্তন সফল হলে backend থেকে
   background-এ secret দিয়ে সুরক্ষিত cache refresh endpoint-এ খবর পাঠানো হয়।
   Response পাঠানোর পরও কাজটি শেষ করার সুযোগ দেয় Vercel-এর `waitUntil`। এই সংযোগ
   configure করা না থাকলে বা সাময়িকভাবে কাজ না করলে নির্ধারিত সময় অনুযায়ী cache
   refresh হওয়ার ব্যবস্থা চালু থাকে। Cache refresh-এর ফল পরের page request-এ
   কার্যকর হয়; আগে থেকে খোলা browser tab নিজে থেকে আপডেট হয় না।
6. MongoDB-তে Product schema-এর নতুন তিনটি index তৈরি হয়েছে কি না যাচাই করুন।
   এগুলো সাধারণ প্রোডাক্ট তালিকার ক্রম, category অনুযায়ী তালিকার ক্রম এবং published
   প্রোডাক্টের slug দিয়ে খোঁজার কাজে ব্যবহৃত হয়। Production-এর অন্য index মুছে
   ফেলার জন্য `syncIndexes` ব্যবহার করবেন না।

MongoDB কোন region-এ আছে, তা যাচাই করার আগে Vercel-এর region পরিবর্তন করবেন না।
Frontend server ও API-কে database-এর কাছাকাছি region-এ রেখে বাংলাদেশ থেকে request-এর
সময় মাপুন। এই পরিবর্তনের মাধ্যমে production-এর region বা credentials বদলানো হয়নি।

প্রোডাক্ট তালিকার response-এ পুরো description, gallery-এর অতিরিক্ত ছবি বা
অপ্রয়োজনীয় document পাঠানো হয় না। Product details page-এ cache ব্যবহার না করে
সরাসরি backend থেকে তথ্য আনা হয়। Checkout-এর সময় আগের মতোই server-এ দাম,
shipping charge ও stock যাচাই করে চূড়ান্ত সিদ্ধান্ত নেওয়া হয়।

## যাচাই করার ধাপ

- `cartout` ফোল্ডারে `npm run build` এবং `npm run lint` চালান।
- `cartout` ফোল্ডারে `node --test tests/*.test.js` এবং `server` ফোল্ডারে `npm test` চালান।
- `npm start -- -p 3100` দিয়ে production frontend চালু করুন। Browser-এর JavaScript
  বন্ধ করেও পেজের HTML-এ প্রোডাক্ট কার্ড পাওয়া যাচ্ছে কি না যাচাই করুন।
- হোম পেজ খোলার সঙ্গে সঙ্গে browser থেকে প্রথম পাতার প্রোডাক্ট বা category-এর
  বাড়তি request যাচ্ছে কি না দেখুন। শুরুতে এগুলো যাওয়ার কথা নয়। Scroll করলে বা
  Load more বাটনে চাপলে দ্বিতীয় পাতার request যাবে; category menu খুললে category
  আনার request যাবে।
- Cart-এর কাজ, category ও search-এর ফলাফল, পর্দার আকার অনুযায়ী ছবি লোড হওয়া এবং
  product details URL পরীক্ষা করুন।
- Deploy করার পর product details URL-গুলো HTTP 200 দিচ্ছে কি না যাচাই করুন।
  HTTP 500 এলে Vercel runtime logs দেখুন।
- ১.৬ Mbps সংযোগ, ১৫০ ms latency এবং CPU চার গুণ ধীর করে মোবাইলের পরীক্ষা আবার
  চালান। নিজের কম্পিউটারে পাওয়া সময় দিয়ে live ওয়েবসাইটের প্রকৃত গতি নিশ্চিত করা
  যায় না; public URL-এও আলাদাভাবে মাপতে হবে।

## Production-এর ESM error-এর সমাধান

Vercel runtime log-এ `ERR_REQUIRE_ESM` পাওয়া গেছে। Backend চালু হওয়ার সময়
`html-encoding-sniffer` থেকে ESM-only `@exodus/bytes`-কে `require()` দিয়ে লোড করতে
গিয়ে function বন্ধ হয়ে যাচ্ছিল। ফলে product, product list ও banner API-ও 500 দিচ্ছিল।

Frontend ও backend-এ CommonJS-এর সঙ্গে সামঞ্জস্যপূর্ণ `isomorphic-dompurify`
`2.26.0` এবং `jsdom` `26.1.0` নির্দিষ্ট করা হয়েছে। DOMPurify sanitizer-এর বর্তমান
`3.4.17` সংস্করণ lockfile-এ রাখা হয়েছে। Backend-এর `MetaData.js`-এ একই CommonJS
পদ্ধতি ব্যবহার করা হয়েছে। Invoice-এর Chromium ও Puppeteer ESM package এখন PDF
তৈরির সময় `import()` দিয়ে লোড হয়।

এই সমাধান deploy করতে দুই প্রজেক্টের `package.json` এবং `package-lock.json`-সহ
পরিবর্তিত ফাইলগুলো commit ও push করুন। শুধু পুরোনো commit redeploy করলে সমাধানটি
কার্যকর হবে না। পরিষ্কার installation-এর জন্য `npm ci` ব্যবহার করা যায়।
`server` ফোল্ডারে `node --test test/runtime.test.js` চালিয়ে CommonJS startup ও
HTML sanitization যাচাই করা যায়; এই test production database ব্যবহার করে না।
