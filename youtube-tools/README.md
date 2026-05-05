````markdown
# YouTube Tools

Tools for exporting and managing your YouTube activity data.

## Scripts

### Extract Liked and Disliked Videos

A browser console script to export your YouTube liked and disliked videos from Google Takeout/My Activity.

#### How to Use

1. Go to: https://myactivity.google.com/page?page=youtube_likes
2. Scroll down to load all your liked/disliked videos (or as many as you want to export)
3. Open your browser's Developer Console:
   - Windows/Linux: `F12` or `Ctrl+Shift+I`
   - Mac: `Cmd+Option+I`
4. Go to the **Console** tab
5. Copy and paste the entire script from `extract_liked_and_disliked_yt_videos.js`
6. Press Enter
7. A CSV file will automatically download with your YouTube activity

#### Output Format

The exported CSV includes:
- `action`: Whether you liked or disliked the video
- `video_title`: The title of the video
- `video_link`: Direct link to the video
- `date_time`: When you liked/disliked it

#### File Format
- Filename: `youtube_likes_export_YYYY-MM-DD.csv`
````
