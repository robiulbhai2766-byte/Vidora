// পেজ লোড হওয়ার সময় রেকর্ড রাখা হচ্ছে (বট স্পিড ট্র্যাকিংয়ের জন্য)
let pageLoadTime = Date.now();

// ফর্ম সাবমিট ইভেন্ট লিসেনার
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // পেজ রিলোড বন্ধ করার জন্য

    // ১. Honeypot চেকিং (বট হিডেন ফিল্ড পূরণ করেছে কিনা)
    const robotField = document.getElementById('robotCheck').value;
    
    if (robotField !== "") {
        alert("🚨 Security Alert: Bot detected!");
        console.log("Access Blocked: Hidden honeypot field filled.");
        return false;
    }

    // ২. Time-Based চেকিং (মানুষ নাকি খুব দ্রুত বট কাজ করছে)
    let submitTime = Date.now();
    let timeTaken = (submitTime - pageLoadTime) / 1000; // কত সেকেন্ড লেগেছে

    if (timeTaken < 3) {
        alert("🚨 Security Alert: You submitted too fast! Are you a robot?");
        return false;
    }

    // ৩. চেকিং সফল হলে আসল আপলোড লজিক
    alert("✅ Security Check Passed! Validating human user...");
    
    // এখানে আপনার ভিডিও আপলোড বা ডেটাবেজে পাঠানোর কোড চলবে
});
