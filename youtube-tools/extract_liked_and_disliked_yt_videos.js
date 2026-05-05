(() => {
    // 1. Find all activity cards on the page using a wider, updated set of selectors
    const cards = document.querySelectorAll('div[data-meta-key], .xDtZAf, [jsname="bN97Pc"]');
    
    if (cards.length === 0) {
        alert("No activity items detected on this page! Make sure you are on the correct 'YouTube Likes and Dislikes' page and have scrolled down to load items.");
        return;
    }

    let csv = "action,video_title,video_link,date_time\n";
    let count = 0;

    cards.forEach(card => {
        try {
            // Find all anchor links within this card
            const links = card.querySelectorAll('a[href*="watch?v="]');
            if (links.length === 0) return;

            const videoLinkElem = links[0];
            const videoUrl = videoLinkElem.href;
            const videoTitle = videoLinkElem.textContent.trim();
            
            // Extract the action (Liked vs Disliked) from the surrounding text
            const cardText = card.textContent || "";
            let action = "liked"; 
            if (cardText.toLowerCase().includes("disliked")) {
                action = "disliked";
            }

            // Extract timestamp if available
            const timeElem = card.querySelector('div[class*="date"], span[class*="time"]');
            const dateTime = timeElem ? `"${timeElem.textContent.trim()}"` : "Unknown";

            // Add clean row to CSV
            csv += [
                action,
                videoTitle ? `"${videoTitle.replace(/"/g, '""')}"` : "[deleted]",
                videoUrl,
                dateTime
            ].join(",") + "\n";
            
            count++;
        } catch (err) {
            // Silently skip any broken elements
        }
    });

    // 2. Trigger the CSV download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `youtube_likes_export_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    console.log(`Successfully exported ${count} liked videos!`);
})();
