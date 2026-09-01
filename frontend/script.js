// Supabase SDK Script (গিটহাবের index.html-এ যুক্ত থাকতে হবে)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = "https://zandggntfbtvicujtmk.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY_HERE"; //sb_publishable_il1v72sFTP5M39a9JvMN-g_SU9C6ur3

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let pageLoadTime = Date.now();

document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // ১. রোবোটিক চেক (Honeypot)
    const robotField = document.getElementById('robotCheck').value;
    if (robotField !== "") {
        alert("🚨 Security Alert: Bot detected!");
        return false;
    }

    // ২. রোবোটিক চেক (Time-based speed check)
    let submitTime = Date.now();
    let timeTaken = (submitTime - pageLoadTime) / 1000;
    if (timeTaken < 3) {
        alert("🚨 Security Alert: You submitted too fast! Are you a robot?");
        return false;
    }

    // ৩. ভিডিও ফাইল আপলোড (Supabase Storage)
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("দয়া করে একটি ভিডিও ফাইল সিলেক্ট করুন।");
        return;
    }

    alert("🤖 Security Check Passed! Uploading video to Supabase...");

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('videos').upload(fileName, file);

    if (error) {
        alert("আপলোডে সমস্যা হয়েছে: " + error.message);
    } else {
        alert("🎉 ভিডিও সফলভাবে আপলোড হয়েছে!");
        console.log("Uploaded file data:", data);
    }
});
