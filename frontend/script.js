// আপলোড হওয়া ভিডিওগুলো Supabase থেকে এনে গ্যালারিতে দেখানোর ফাংশন
async function loadVideos() {
    const gallery = document.getElementById('videoGallery');
    
    const { data, error } = await supabase.storage.from('videos').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
    });

    if (error) {
        gallery.innerHTML = "<p>ভিডিও লোড করতে সমস্যা হয়েছে।</p>";
        return;
    }

    if (!data || data.length === 0) {
        gallery.innerHTML = "<p>এখনো কোনো ভিডিও আপলোড করা হয়নি।</p>";
        return;
    }

    gallery.innerHTML = "";

    data.forEach(file => {
        // sb_publishable_il1v72sFTP5M39a9JvMN-g_SU9C6ur3
        const { data: publicUrlData } = supabase.storage.from('videos').getPublicUrl(file.name);
        
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <video controls src="${publicUrlData.publicUrl}"></video>
            <p>${file.name}</p>
        `;
        gallery.appendChild(videoCard);
    });
}

// পেজ লোড হলে গ্যালারি লোড হবে
loadVideos();
