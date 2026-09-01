const SUPABASE_URL = "https://zandggntfbtvicujtmk.supabase.co";
const SUPABASE_KEY = "sb_publishable_i1v72sFTP5M39a9JvMN-g_SU9C6ur3";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let pageLoadTime = Date.now();

// Modal Logic
function openModal() {
    document.getElementById('uploadModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

// Upload Handling
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const robotField = document.getElementById('robotCheck').value;
    if (robotField !== "") {
        alert("🚨 Security Alert: Bot detected!");
        return false;
    }

    let timeTaken = (Date.now() - pageLoadTime) / 1000;
    if (timeTaken < 3) {
        alert("🚨 Security Alert: Submitted too fast!");
        return false;
    }

    const fileInput = document.getElementById('videoFile');
    const titleInput = document.getElementById('videoTitle');
    const file = fileInput.files[0];

    if (!file) return;

    alert("🤖 Security Passed! Uploading video...");

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from('videos').upload(fileName, file);

    if (error) {
        alert("Upload Error: " + error.message);
    } else {
        alert("🎉 Upload Successful!");
        closeModal();
        loadVideos();
    }
});

// Load YouTube Grid Feed
async function loadVideos() {
    const gallery = document.getElementById('videoGallery');
    
    const { data, error } = await supabase.storage.from('videos').list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
    });

    if (error || !data || data.length === 0) {
        gallery.innerHTML = "<p>No videos uploaded yet.</p>";
        return;
    }

    gallery.innerHTML = "";

    data.forEach(file => {
        const { data: publicUrlData } = supabase.storage.from('videos').getPublicUrl(file.name);
        
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <video class="video-thumb" controls src="${publicUrlData.publicUrl}"></video>
            <div class="video-details">
                <div class="channel-icon"><i class="fa-solid fa-play"></i></div>
                <div class="video-info">
                    <div class="video-title">${file.name}</div>
                    <div class="channel-name">Vidora Creator</div>
                </div>
            </div>
        `;
        gallery.appendChild(videoCard);
    });
}

loadVideos();
