// State management
let userState = {
    stage: null,
    platform: null,
    os: null,
    problem: null
};

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Stage selection
function selectStage(stage) {
    userState.stage = stage;
    showSection('platform');
}

// Platform selection
function selectPlatform(platform) {
    userState.platform = platform;
    
    if (platform === 'phone') {
        showSection('phone-os');
    } else if (platform === 'computer') {
        showSection('computer-os');
    } else if (platform === 'both') {
        // For 'both', default to phone first
        showSection('phone-os');
    }
}

// OS selection
function selectOS(os, deviceType) {
    if (deviceType === 'phone' && userState.platform === 'both') {
        userState.phoneOS = os;
        showSection('computer-os');
    } else {
        userState.os = os;
        showSection('problem');
    }
}

// Problem selection
function selectProblem(problem) {
    userState.problem = problem;
    generateActionPlan();
    showSection('action-plan');
}

// Navigate back from problem selection
function goBackFromProblem() {
    if (userState.platform === 'phone') {
        showSection('phone-os');
    } else if (userState.platform === 'computer') {
        showSection('computer-os');
    } else {
        showSection('computer-os'); // If both, we came from computer-os
    }
}

// Restart guide
function restartGuide() {
    userState = {
        stage: null,
        platform: null,
        os: null,
        problem: null
    };
    showSection('landing');
}

// Generate action plan based on selections
function generateActionPlan() {
    const content = document.getElementById('action-content');
    const plan = getActionPlan(userState.stage, userState.os, userState.problem);
    content.innerHTML = plan;
}

// Action plan templates
function getActionPlan(stage, os, problem) {
    // Get the appropriate plan based on combinations
    const key = `${os}_${problem}_${stage}`;
    
    // Base templates by OS and problem
    let plan = '';
    
    if (os === 'iphone') {
        plan = getiPhonePlan(problem, stage);
    } else if (os === 'android') {
        plan = getAndroidPlan(problem, stage);
    } else if (os === 'windows' || os === 'mac' || os === 'linux') {
        plan = getComputerPlan(os, problem, stage);
    }
    
    return plan;
}

function getiPhonePlan(problem, stage) {
    let plan = `<h2>Your action plan: iPhone + ${problem}</h2>`;
    
    if (problem === 'social-feeds') {
        plan += `
            <p>Right, so you're on iPhone and social media feeds are eating your life. Here's what you do.</p>
            
            <div class="action-box">
                <h3>Right now (next 10 minutes)</h3>
                <p>Open Settings, go to Screen Time. Look at your numbers. Don't judge yourself, just look. Which app is winning? Instagram? Reddit? Twitter? That's your target.</p>
            </div>
            
            <div class="action-box">
                <h3>Tonight before bed</h3>
                <p>Install <strong>One Sec</strong> (https://one-sec.app/). It's free. Set it up for your worst app. What it does is force a breathing exercise before opening the app. Sounds stupid, but it breaks the automatic "open app without thinking" pattern.</p>
                
                <p>Alternative if you want more control: <strong>ScreenZen</strong> - lets you set wait timers, block apps during certain hours. Currently free.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Delete the app from your home screen.</strong> Not from your phone yet, just hide it. Access it through search or the app library. Adds just enough friction.</p>
                
                <p><strong>Turn on grayscale mode.</strong> Settings > Accessibility > Display & Text Size > Color Filters. Select grayscale. Your phone looks shit now. That's the point. Instagram is way less interesting in black and white.</p>
                
                <p>Set up the triple-click shortcut (Settings > Accessibility > Accessibility Shortcut) so you can toggle color back on when you need it for photos.</p>
                
                ${stage === 'waking-up' ? '<p><strong>Set realistic Screen Time limits.</strong> Don\'t go from 3 hours to 5 minutes. Cut it by a third to start. You need to actually hit the limit and feel it, not set it so low you override it immediately.</p>' : ''}
            </div>
            
            <div class="action-box">
                <h3>When you're ready for more</h3>
                <p><strong>Actually delete the app.</strong> Keep it deleted for a week. You can still access through browser if you really need to, but browser versions are deliberately worse, which helps.</p>
                
                <p><strong>Use Blank</strong> (https://apps.apple.com/us/app/blank-spaces-launcher/id1570856853) to make your home screen text-based. Sounds extreme but once you adjust, colorful icons feel overwhelming.</p>
                
                ${stage === 'advanced' ? '<p><strong>Create empty home screen pages.</strong> Multiple pages with nothing on them. Makes you swipe through emptiness to get to App Library. Annoying enough to make you reconsider.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The thing nobody tells you</h3>
                <p>You're going to fail at this multiple times. That's normal. The pattern is: try something, works for a bit, stop doing it, feel bad, restart. What matters is restarting. Each time you learn what actually works for you versus what sounds good but doesn't stick.</p>
            </div>
        `;
    } else if (problem === 'video-holes') {
        plan += `
            <p>YouTube or TikTok is the problem. You go to watch one thing, suddenly it's 2am.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p>Check your Screen Time for YouTube/TikTok. Screenshot it if you want, for later comparison.</p>
                
                <p><strong>Delete TikTok if you have it.</strong> Just delete it. There's no moderate use case for TikTok. It's designed to be unputdownable. If you need to watch something from TikTok, someone will send you the link and you can watch in browser.</p>
            </div>
            
            <div class="action-box">
                <h3>For YouTube</h3>
                <p><strong>Stop using the app.</strong> Use YouTube only through Safari with desktop mode enabled (tap AA in address bar, request desktop site). Makes it clunkier, which is the point.</p>
                
                <p><strong>Or install One Sec</strong> for YouTube app. Forces that annoying breathing exercise. Works surprisingly well because it breaks the automatic reach-for-app pattern.</p>
                
                <p><strong>Use subscriptions, not recommendations.</strong> If you must use YouTube, go directly to your subscriptions. Don't open the app to the home feed. Don't watch shorts. Don't let autoplay run.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p>Set up Screen Time limits. If you're at 4 hours a day, set it to 2 hours. Not 15 minutes. You need to actually hit the limit and feel it, not override it immediately.</p>
                
                <p>Turn on grayscale mode at night. Settings > Accessibility > Display & Text Size > Color Filters. Schedule it using Shortcuts app or just use triple-click to toggle.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Start replacing the habit.</strong> When you feel the urge to open YouTube, do something else. Read something. Message a friend. Go for a walk. The urge passes in about 5-10 minutes if you don\'t give in.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>Real talk</h3>
                <p>Video platforms are optimized by some of the smartest people in the world to keep you watching. You're not weak for struggling with this. But you do need to make it harder on yourself, because willpower alone doesn't work against algorithms designed to bypass willpower.</p>
            </div>
        `;
    } else if (problem === 'messaging-stress') {
        plan += `
            <p>Constant notifications, feeling like you need to respond immediately. Your phone controls you.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Turn off all non-essential notifications.</strong> Settings > Notifications. Go through every app. Only keep notifications for actual people trying to reach you. Not apps, not services, not newsletters. People.</p>
                
                <p>Be brutal. Instagram doesn't need to notify you that someone liked your photo. Twitter doesn't need to tell you about tweets you might like. Turn it all off.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Set up Focus modes.</strong> Settings > Focus. Create one for work (only work messages), one for personal time (only close friends/family), one for deep work (nothing except phone calls from favorites).</p>
                
                <p><strong>Remove badges.</strong> Those red notification numbers. Settings > Notifications > Show Previews > Never. Or per-app, turn off badges. They create false urgency.</p>
                
                <p><strong>Change your lock screen.</strong> Settings > Notifications > Show Preview > When Unlocked. Stop seeing message content on your lock screen. Forces you to actually unlock to see, adds friction.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set messaging hours.</strong> You don't need to be available 24/7. Use Focus modes to automatically silence group chats during work hours, or personal messages during focused work time.</p>
                
                <p><strong>Batch your responses.</strong> Check messages 2-3 times a day instead of constantly. Morning, lunch, evening. People will adjust.</p>
                
                ${stage === 'advanced' ? '<p><strong>Move messaging apps off your home screen.</strong> Access through search. Makes checking them slightly annoying, which reduces the constant checking impulse.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The guilt thing</h3>
                <p>You'll feel guilty not responding immediately. That's conditioning, not reality. Most messages don't require immediate responses. The ones that do will call you. Train yourself and others that you respond when you're ready, not immediately.</p>
            </div>
        `;
    } else if (problem === 'news-addiction') {
        plan += `
            <p>Constantly checking news sites, reddit, twitter for updates. Never actually caught up.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Delete news apps.</strong> All of them. Twitter, reddit, news apps, everything. If something is actually important, you'll hear about it. You won't miss anything that matters.</p>
                
                <p><strong>Turn off news notifications.</strong> All of them. News apps love to send breaking news alerts. It's never actually breaking in a way that requires your immediate attention.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set up an RSS reader.</strong> Choose what you read instead of algorithmic feeds. Check it once a day, max.</p>
                
                <p><strong>Schedule your news time.</strong> 15-30 minutes in the morning or evening. Not throughout the day. Not before bed. Set a timer. When it goes off, you're done.</p>
                
                <p><strong>Use Screen Time to block news sites</strong> outside your scheduled time. Settings > Screen Time > App Limits > Add Limit. Select Safari, set hours you're allowed to use it.</p>
            </div>
            
            <div class="action-box">
                <h3>The shift</h3>
                <p>You're not staying informed by checking constantly. You're staying anxious. Real information comes in daily or weekly digests, not minute-by-minute updates.</p>
                
                <p><strong>Subscribe to actual newsletters.</strong> Weekly roundups from sources you trust. Not breaking news, thoughtful analysis.</p>
                
                ${stage === 'advanced' ? '<p><strong>Consider a news diet.</strong> A week without any news at all. See what actually matters. Spoiler: not much changes in a week, and you\'ll be fine not knowing about it in real-time.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The anxiety loop</h3>
                <p>News addiction isn't about staying informed. It's about anxiety. Feeling like you need to know what's happening right now, all the time. That's not information-seeking, that's anxiety-seeking. Address the anxiety, not just the behavior.</p>
            </div>
        `;
    } else if (problem === 'phone-checking') {
        plan += `
            <p>You pick up your phone without even thinking about it. Muscle memory.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Move your phone.</strong> Not next to you. Across the room. On a different floor. In a drawer. Make it slightly annoying to get to.</p>
                
                <p><strong>Turn off raise to wake.</strong> Settings > Display & Brightness > Raise to Wake > Off. Stops your phone lighting up every time you move it.</p>
                
                <p><strong>Remove everything from your lock screen.</strong> No widgets, no notifications preview. Make looking at your lock screen boring.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set up Focus modes with blank home screens.</strong> When Focus is on, show only essential apps. Settings > Focus > [Your Focus] > Home Screen.</p>
                
                <p><strong>Turn on grayscale.</strong> Settings > Accessibility > Display & Text Size > Color Filters. Makes your phone visually boring. Set up triple-click shortcut to toggle when needed.</p>
                
                <p><strong>Replace the reach.</strong> When you notice yourself reaching for your phone, do something else. Literally anything. Stretch. Look out a window. Take a breath. The urge passes.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Use a watch if you have one.</strong> Check time on your watch, not your phone. Reduces the "checking time turns into 20 minutes of scrolling" problem.</p>' : ''}
            </div>
            
            <div class="action-box">
                <h3>Advanced tactics</h3>
                ${stage === 'advanced' ? `
                <p><strong>Get a kitchen timer or alarm clock.</strong> Stop using your phone for these. Removes excuses to have it near you.</p>
                
                <p><strong>Phone-free zones.</strong> Bedroom, dining table, bathroom. Leave your phone somewhere else. Actually enforce this.</p>
                
                <p><strong>Use Do Not Disturb liberally.</strong> Not just at night. Anytime you're doing something that matters. Focus modes for everything.</p>
                ` : `
                <p><strong>Use Screen Time to see when you check most.</strong> Settings > Screen Time. Look at pickups per hour. That's your target time to address.</p>
                `}
            </div>
            
            <div class="warning-box">
                <h3>The hard part</h3>
                <p>Phone checking is often about avoiding being alone with your thoughts. Boredom, anxiety, discomfort. The phone is an escape. You need to learn to sit with those feelings instead of immediately medicating them with content.</p>
            </div>
        `;
    } else if (problem === 'work-distraction') {
        plan += `
            <p>Your phone disrupts work. Meant to focus, but it's right there.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Put your phone in another room.</strong> Not on your desk. Not in your pocket. Another room. If you need it for 2FA or calls, fine, but make it annoying to get to for everything else.</p>
                
                <p><strong>Set up a Work Focus.</strong> Settings > Focus > Work. Turn off all notifications except actual emergencies. Schedule it for your work hours. Let it auto-enable.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Delete work-disrupting apps from your phone.</strong> Social media, news, games, anything that pulls you away. You can reinstall later if needed, but get them off for now.</p>
                
                <p><strong>Use Screen Time app limits during work hours.</strong> Block social media, news, youtube, whatever distracts you. Settings > Screen Time > App Limits.</p>
                
                <p><strong>Turn your phone grayscale during work.</strong> Makes it less appealing to pick up. Settings > Accessibility > Display & Text Size > Color Filters.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Create a new home screen for work mode.</strong> Only work-related apps. Use Focus mode to switch to this screen during work hours. Settings > Focus > Work > Home Screen.</p>
                
                <p><strong>Batch your personal phone time.</strong> Check messages/social during lunch and after work. Not throughout the day. Train yourself that work time is for work.</p>
                
                ${stage === 'advanced' ? '<p><strong>Get a second device for work if possible.</strong> Separate work phone or keep work stuff on laptop only. Physical separation helps mental separation.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>Real issue</h3>
                <p>If your phone is a constant work distraction, you're probably either avoiding difficult work or your work isn't engaging enough. The phone is a symptom. Break work into smaller chunks, use pomodoro technique, figure out what makes the work feel overwhelming.</p>
            </div>
        `;
    }
    
    return plan;
}

function getAndroidPlan(problem, stage) {
    let plan = `<h2>Your action plan: Android + ${problem}</h2>`;
    
    if (problem === 'social-feeds') {
        plan += `
            <p>Android + social feeds. Here's your plan.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p>Open <strong>Digital Wellbeing</strong> (Settings > Digital Wellbeing & parental controls). Look at your screen time. Which app is destroying you? That's your target.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Set up app timers in Digital Wellbeing.</strong> Your worst app first. If you're at 4 hours a day, set it to 2 hours. Not 15 minutes. You need to hit the limit and feel it, not override it immediately.</p>
                
                <p><strong>Turn on Bedtime mode.</strong> Digital Wellbeing > Bedtime mode. Schedule it for evenings. Grayscale screen, silenced notifications. Makes your phone less appealing at night.</p>
                
                <p><strong>Install ScreenZen or similar.</strong> Forces wait timers before opening apps. Breaks the automatic opening pattern.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Uninstall the app.</strong> Not disable, uninstall. You can access through browser if you really need to, but browser versions are deliberately worse.</p>
                
                <p><strong>Use a minimalist launcher.</strong> CC Launcher (https://github.com/mlm-games/cclauncher) is designed specifically to reduce screen time. Makes your home screen boring, which is the point.</p>
                
                ${stage === 'waking-up' ? '<p><strong>Enable Focus mode.</strong> Digital Wellbeing > Focus mode. Select your problem apps. When enabled, they\'re paused. Use this during work or family time.</p>' : ''}
                
                <p><strong>Turn on grayscale permanently.</strong> Settings > Accessibility > Color correction > Grayscale. Or schedule it with Bedtime mode. Makes scrolling less interesting.</p>
            </div>
            
            <div class="action-box">
                <h3>Going deeper</h3>
                ${stage === 'advanced' ? `
                <p><strong>Consider GrapheneOS.</strong> (https://grapheneos.org) Complete reset. Privacy-focused Android. Fresh start. Nuclear option but effective.</p>
                
                <p><strong>Use F-Droid instead of Play Store</strong> for open source alternatives. Often less addictive because they're not optimized for engagement.</p>
                ` : `
                <p><strong>Remove from home screen.</strong> Don't just uninstall, remove shortcuts to app drawer too. Make it annoying to find.</p>
                `}
            </div>
            
            <div class="warning-box">
                <h3>Android advantage</h3>
                <p>Android gives you more control than iPhone. Use it. You can block apps system-wide, use third-party launchers, really customize your device to work for you instead of against you.</p>
            </div>
        `;
    } else if (problem === 'video-holes') {
        plan += `
            <p>YouTube or TikTok is eating your time.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Uninstall TikTok.</strong> Just delete it. There's no moderate use of TikTok. It's designed to be infinite. Gone.</p>
                
                <p><strong>For YouTube: install NewPipe.</strong> Get it from F-Droid (https://f-droid.org). It's YouTube without recommendations, without shorts, without algorithmic bullshit. Just a search bar and subscriptions.</p>
                
                <p>Uninstall the official YouTube app. Use NewPipe instead. Can still watch what you want, but it doesn't try to keep you there forever.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set app timers in Digital Wellbeing</strong> if you're still using official YouTube. Limit to 1-2 hours max. When timer expires, you're done for the day.</p>
                
                <p><strong>Turn on Bedtime mode at night.</strong> Grayscale + DND. Makes video watching less appealing. Digital Wellbeing > Bedtime mode.</p>
                
                <p><strong>Replace the habit.</strong> When you feel the urge to watch videos, do literally anything else. Read something. Message someone. Use StreetComplete (https://streetcomplete.app) if you need something gamified.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Disable autoplay everywhere.</strong> In NewPipe, in browser, everywhere. Make each video a conscious choice.</p>' : ''}
            </div>
            
            <div class="action-box">
                <h3>Browser approach</h3>
                <p><strong>If you must use YouTube, use it in browser only.</strong> Firefox or Chrome. Install uBlock Origin. Use desktop mode (makes it clunkier on mobile). Don't log in (no recommendations, no history-based suggestions).</p>
                
                ${stage === 'advanced' ? '<p><strong>DNS-level blocking for YouTube during certain hours.</strong> Set up on your router if you control it. Blocks at network level, can\'t bypass without changing DNS.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The algorithm</h3>
                <p>Video platforms are designed by hundreds of engineers to keep you watching. You're fighting a machine learning algorithm optimized over billions of hours of watch time. You need technical barriers, not just willpower.</p>
            </div>
        `;
    } else if (problem === 'messaging-stress') {
        plan += `
            <p>Constant notifications, always feeling like you need to respond.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Disable all non-essential notifications.</strong> Settings > Notifications. Go through every app. Only keep notifications for actual people. Not apps, not services, not group chats with 47 people.</p>
                
                <p><strong>Long press on annoying notifications.</strong> Turn them off right from the notification. Don't wait until later.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Use Focus mode for work/personal boundaries.</strong> Digital Wellbeing > Focus mode. Select messaging apps to pause during work hours. They'll unpause automatically when Focus ends.</p>
                
                <p><strong>Turn off notification dots/badges.</strong> Settings > Notifications > Advanced > Allow notification dot (disable). Those red dots create false urgency.</p>
                
                <p><strong>Mute group chats.</strong> All of them. Check them when you want, not when they ping you. Long press on chat > Mute notifications.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set Do Not Disturb schedule.</strong> Automatically silence everything during sleep, work, or focused time. Digital Wellbeing > Bedtime mode or Do Not Disturb schedules.</p>
                
                <p><strong>Batch your messaging time.</strong> Check 2-3 times a day instead of constantly. Morning, lunch, evening. People will adjust to your response time.</p>
                
                ${stage === 'advanced' ? '<p><strong>Consider Molly instead of Signal</strong> (https://molly.im) or other privacy-focused messaging that doesn\'t show read receipts. Reduces pressure to respond immediately.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The availability trap</h3>
                <p>Being always available doesn't make you a better friend/colleague/family member. It makes you stressed. Most messages don't need immediate responses. The ones that do will call. Train people that you respond when ready.</p>
            </div>
        `;
    } else if (problem === 'news-addiction') {
        plan += `
            <p>Constantly checking news, reddit, twitter. Never actually informed, just anxious.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Uninstall all news apps.</strong> News apps, reddit, twitter, everything. If it's important, you'll hear about it. You won't miss anything that matters.</p>
                
                <p><strong>Disable all news notifications.</strong> Breaking news alerts are never actually breaking in a way that requires your attention.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Install an RSS reader.</strong> Something simple. Add feeds from sources you trust. Check once a day, max. Not throughout the day.</p>
                
                <p><strong>Set app timers for browsers.</strong> Digital Wellbeing > Dashboard > [Browser] > App timer. Limit to 30 minutes a day for news browsing. When time's up, you're done.</p>
                
                <p><strong>Use Focus mode to block news during work.</strong> Digital Wellbeing > Focus mode. Add browsers and news apps. Enable during work hours.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Schedule your news time.</strong> 15-30 minutes in morning or evening. Set a timer. When it goes off, close everything. Train yourself that news has a time limit.</p>' : ''}
            </div>
            
            <div class="action-box">
                <h3>The shift</h3>
                <p><strong>Subscribe to newsletters instead of feeds.</strong> Weekly or daily digests. Not real-time updates. Not breaking news. Thoughtful analysis.</p>
                
                ${stage === 'advanced' ? '<p><strong>Try a news fast.</strong> A week with no news at all. See what happens. Spoiler: nothing changes. World keeps spinning. You\'ll be fine.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>Information vs anxiety</h3>
                <p>You're not staying informed by checking constantly. You're feeding anxiety. Real information comes in summaries and analysis, not minute-by-minute updates that change nothing about your life.</p>
            </div>
        `;
    } else if (problem === 'phone-checking') {
        plan += `
            <p>You check your phone constantly without even thinking about it.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Put your phone across the room.</strong> Not on your desk. Not in your pocket. Make it slightly annoying to get to. Physical distance creates mental distance.</p>
                
                <p><strong>Disable lift to wake/ambient display.</strong> Settings > Display > Advanced > Ambient display (turn off). Screen stays off unless you deliberately turn it on.</p>
                
                <p><strong>Remove everything from lock screen.</strong> No widgets. Minimal notifications. Make looking at your lock screen boring.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Use a minimalist launcher.</strong> CC Launcher (https://github.com/mlm-games/cclauncher) makes your home screen text-based and boring. Reduces the appeal of unlocking your phone.</p>
                
                <p><strong>Enable grayscale.</strong> Settings > Accessibility > Color correction > Grayscale. Or use Bedtime mode to schedule it. Makes your phone visually less interesting.</p>
                
                <p><strong>Check your pickup stats.</strong> Digital Wellbeing shows how often you unlock your phone. Look at when you check most. That's your target time to address.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Replace the reach.</strong> When you notice yourself reaching for your phone, do something else. Stretch. Look around. Take a breath. The urge passes in 5-10 minutes.</p>' : ''}
            </div>
            
            <div class="action-box">
                <h3>Advanced tactics</h3>
                ${stage === 'advanced' ? `
                <p><strong>Phone-free zones.</strong> Bedroom, dining table, bathroom. Actually enforce this. Leave it in another room.</p>
                
                <p><strong>Get a separate alarm clock.</strong> Stop using your phone as alarm. Removes excuse to have it by your bed.</p>
                
                <p><strong>Use a watch for time.</strong> Stop checking your phone for time, which turns into 20 minutes of scrolling.</p>
                ` : `
                <p><strong>Use Focus mode for specific activities.</strong> Reading, eating, conversation. Enable manually when you want phone-free time.</p>
                `}
            </div>
            
            <div class="warning-box">
                <h3>The real problem</h3>
                <p>Phone checking is often about avoiding discomfort. Boredom, anxiety, being alone with thoughts. The phone is easy escape. You need to learn to sit with those feelings instead of immediately medicating them with content.</p>
            </div>
        `;
    } else if (problem === 'work-distraction') {
        plan += `
            <p>Your phone disrupts work constantly.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Put phone in another room during work.</strong> Not on desk. Not in pocket. Different room. If you need it for 2FA, fine, but make it annoying to get to.</p>
                
                <p><strong>Enable Focus mode for work hours.</strong> Digital Wellbeing > Focus mode. Select all distracting apps. Schedule it for work hours. Auto-enables, auto-disables.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Uninstall work-disrupting apps.</strong> Social media, games, news, anything that pulls you away. Can reinstall later if needed, but get them off now.</p>
                
                <p><strong>Set app timers for work hours.</strong> Digital Wellbeing > App timers. Block distracting apps completely during work. Zero minutes allowed.</p>
                
                <p><strong>Turn on grayscale during work.</strong> Makes phone less appealing. Settings > Accessibility > Color correction or schedule with Bedtime mode.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Use work-only home screen.</strong> Some launchers let you have different home screens for different contexts. Show only work apps during work hours.</p>
                
                <p><strong>Batch personal phone time.</strong> Check messages/social during lunch and after work. Not during work. Train yourself that work time is for work.</p>
                
                ${stage === 'advanced' ? '<p><strong>Consider a second device.</strong> Separate work phone or tablet. Keep personal stuff completely separate. Physical separation helps mental separation.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>Deeper issue</h3>
                <p>If phone is a constant work distraction, you're probably avoiding something. Work too hard? Too boring? Break it into smaller chunks. Use pomodoro. Figure out what makes work feel overwhelming or unengaging.</p>
            </div>
        `;
    }
    
    return plan;
}

function getComputerPlan(os, problem, stage) {
    let plan = `<h2>Your action plan: ${os.charAt(0).toUpperCase() + os.slice(1)} + ${problem}</h2>`;
    
    // Computer plans are mostly similar across OSes, with some platform-specific tools
    if (problem === 'social-feeds') {
        plan += `
            <p>You sit down at your computer and somehow end up scrolling.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Install the Anti-Doomscroll extension.</strong> Check your project files for the extension code. It blocks feeds on YouTube, Reddit, Pinterest, Substack, Twitter, Instagram, TikTok, and Facebook. You can still search, just no infinite feeds.</p>
                
                <p><strong>Or install uBlock Origin</strong> and manually block feed elements. Right click on feed > Block element. Takes more setup but gives you control.</p>
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                ${os === 'windows' ? `
                <p><strong>Use Windows Focus</strong> to hide distracting notifications. Settings > System > Focus > Priority only or Alarms only during work hours.</p>
                
                <p><strong>Install Cold Turkey</strong> or similar. Blocks websites during scheduled times. Can't be bypassed easily (even admin can't override during block time).</p>
                ` : os === 'mac' ? `
                <p><strong>Use Screen Time.</strong> System Preferences > Screen Time. Set app limits and website restrictions. Actually use it.</p>
                
                <p><strong>Install SelfControl or similar.</strong> Blocks websites for set time periods. Can't be undone even if you restart.</p>
                ` : `
                <p><strong>Use /etc/hosts file</strong> to block sites. Add lines like "127.0.0.1 reddit.com". Requires sudo to change, adds friction.</p>
                
                <p><strong>Install LeechBlock NG</strong> browser extension. Time-based blocking with lots of configuration options.</p>
                `}
                
                <p><strong>Log out of social media sites.</strong> Not just close tabs, actually log out. Makes accessing them slightly more annoying.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Remove bookmarks</strong> to time-wasting sites. Remove from bookmark bar, remove from autocomplete suggestions.</p>
                
                <p><strong>Use a separate browser for work.</strong> Firefox for work (logged into work accounts only), Chrome for personal (with all the blockers). Physical separation of contexts helps.</p>
                
                ${stage === 'advanced' ? `
                <p><strong>Set up DNS-level blocking.</strong> Block at router level if you control it. Pi-hole or AdGuard Home. Can't bypass without changing DNS settings.</p>
                
                <p><strong>Create a separate user account for focused work.</strong> No social media logged in, minimal apps installed, boring desktop. Switch to it when you need to focus.</p>
                ` : ''}
            </div>
            
            <div class="warning-box">
                <h3>The computer difference</h3>
                <p>Computer blocking is easier to bypass than phone blocking. You have more admin access, you can just disable extensions. The key is making it annoying enough that you reconsider before bypassing, not making it impossible.</p>
            </div>
        `;
    } else if (problem === 'video-holes') {
        plan += `
            <p>YouTube rabbit holes on your computer.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Install the Anti-Doomscroll extension.</strong> Blocks YouTube home feed and recommended videos. You can still search and watch specific videos. Check your project files for the code.</p>
                
                <p><strong>Install Unhook</strong> or similar YouTube-specific extension. Removes recommendations, trending, comments, everything designed to keep you watching.</p>
                
                <p><strong>Install uBlock Origin.</strong> Block page elements manually. YouTube sidebar, end screen videos, home feed. Right click > Block element.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Use website blockers with time limits.</strong> Allow yourself 1 hour of YouTube per day. When time's up, it's blocked.</p>
                
                ${os === 'windows' ? `
                <p><strong>Cold Turkey or similar.</strong> Schedule YouTube blocks during work hours or after certain time of night.</p>
                ` : os === 'mac' ? `
                <p><strong>Screen Time limits.</strong> System Preferences > Screen Time > App Limits. Limit browser time or specific websites.</p>
                ` : `
                <p><strong>LeechBlock NG</strong> with time allowances. 1 hour per day total, blocks after that. Can't easily override.</p>
                `}
                
                <p><strong>Log out of YouTube.</strong> Not logged in means no personalized recommendations, no auto-subscriptions sidebar tempting you.</p>
                
                ${stage === 'motivated' || stage === 'fluctuating' ? '<p><strong>Disable autoplay.</strong> YouTube settings > Autoplay. Turn it off. Makes each video a conscious choice.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The pull</h3>
                <p>YouTube is designed by some of the best engineers in the world to keep you watching. Recommendation algorithm trained on billions of hours. You need technical barriers, not just discipline.</p>
            </div>
        `;
    } else if (problem === 'work-distraction') {
        plan += `
            <p>Meant to work, but tabs keep multiplying.</p>
            
            <div class="action-box">
                <h3>Right now</h3>
                <p><strong>Close all non-work tabs.</strong> Right now. Everything. Start fresh. Use a separate browser for personal stuff.</p>
                
                <p><strong>Install a website blocker.</strong> Block social media, news, reddit, whatever your weakness is during work hours.</p>
                
                ${os === 'windows' ? `
                <p><strong>Use Focus mode.</strong> Windows 11: Settings > Focus. Turns off notifications, hides badges. Set it for work hours.</p>
                
                <p><strong>Install Cold Turkey.</strong> Schedule blocks for distracting sites during work. Can't bypass without restarting (and it counts that against you).</p>
                ` : os === 'mac' ? `
                <p><strong>Use Focus mode.</strong> System Preferences > Focus. Set up Work focus that silences everything except important work notifications.</p>
                
                <p><strong>Use Screen Time app limits.</strong> Block distracting websites completely during work hours.</p>
                ` : `
                <p><strong>Use /etc/hosts for blocking.</strong> Add distracting sites to hosts file pointing to 127.0.0.1. Edit with sudo, adds friction to bypass.</p>
                
                <p><strong>Use a tiling window manager</strong> if you're comfortable. i3, awesome, others. Makes full-screen focus easier, tab proliferation harder.</p>
                `}
            </div>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Use separate browsers for work and personal.</strong> Firefox logged into work accounts only. Chrome for personal with no work accounts. Never cross the streams.</p>
                
                <p><strong>Turn off all non-essential notifications.</strong> Email notifications, chat notifications, everything. Batch check these at specific times, don't let them interrupt.</p>
                
                <p><strong>Use Pomodoro timer.</strong> 25 minutes focused work, 5 minute break. During work time, blocked sites stay blocked. During break, you can check stuff. Makes rules clearer.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Create a distraction-free work environment.</strong> Separate desktop/virtual desktop for work. Nothing but work apps. Switch to it when working.</p>
                
                ${stage === 'advanced' ? `
                <p><strong>Use a separate user account for focused work.</strong> No social media, no games, minimal apps. Switch to it for deep work sessions.</p>
                
                <p><strong>DNS-level blocking during work hours.</strong> Set up router-level blocking if possible. Can't bypass without changing network settings.</p>
                
                ${os === 'linux' ? '<p><strong>Use a minimal window manager</strong> for work sessions. No taskbar, no distractions, just your work and nothing else.</p>' : ''}
                ` : ''}
            </div>
            
            <div class="warning-box">
                <h3>The real issue</h3>
                <p>Computer distractions during work usually mean work is either too hard or too boring. Break it into smaller pieces. Use pomodoro. Figure out what's making you avoid the actual work. The distraction is a symptom.</p>
            </div>
        `;
    } else if (problem === 'news-addiction') {
        plan += `
            <p>Constantly checking news sites, can't stop refreshing.</p>
            
            <div class="action-box">
                <h3>Today</h3>
                <p><strong>Install a website blocker.</strong> Block news sites during specific hours. Not all day (yet), just during times you should be doing other things.</p>
                
                ${os === 'windows' ? '<p><strong>Cold Turkey Blocker.</strong> Free version works. Schedule news blocks for work hours and evenings.</p>' : os === 'mac' ? '<p><strong>SelfControl or Screen Time.</strong> Block news sites for set periods. Can\'t undo even if you restart.</p>' : '<p><strong>LeechBlock NG</strong> or hosts file blocking. Schedule blocks for news sites during work hours.</p>'}
                
                <p><strong>Unfollow/unsubscribe from breaking news.</strong> Twitter accounts, telegram channels, RSS feeds that send constant updates. Keep only weekly/daily digests.</p>
            </div>
            
            <div class="action-box">
                <h3>This week</h3>
                <p><strong>Set up an RSS reader.</strong> Add feeds from sources you trust. Check it once a day. Close it when done. Not throughout the day.</p>
                
                <p><strong>Schedule your news time.</strong> 30 minutes in morning or evening. Set a timer. When timer ends, close all news tabs. Done for the day.</p>
                
                <p><strong>Remove news sites from bookmarks.</strong> From bookmark bar, from autocomplete. Make accessing them slightly more deliberate.</p>
                
                ${stage === 'advanced' ? '<p><strong>Try a news fast.</strong> Block all news sites for a week. See what happens. Spoiler: nothing changes. You\'ll be fine not knowing in real-time.</p>' : ''}
            </div>
            
            <div class="warning-box">
                <h3>The anxiety loop</h3>
                <p>News addiction isn't about being informed. It's about managing anxiety. Feeling like you need to know what's happening right now. That's not information-seeking, that's anxiety-seeking. Address the anxiety, not just the behavior.</p>
            </div>
        `;
    } else {
        // Generic fallback for any other problems
        plan += `
            <p>Here's a general approach for ${problem} on ${os}.</p>

            <div class="action-box">
                <h3>Start with these</h3>
                <p><strong>Install website blockers.</strong> Block distracting sites during times you need to focus.</p>
                <p><strong>Use separate browsers</strong> for work and personal. Never cross them.</p>
                <p><strong>Turn off notifications</strong> for everything except actual emergencies.</p>
            </div>
        `;
    }

    return plan;
}

// ===== Social Media Search Interface Functions =====

let currentSearchPlatform = 'youtube';
let savedItems = [];

// Load saved items from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedItems();
    displaySavedItems();
});

// Select search platform (tabs)
function selectSearchPlatform(platform) {
    currentSearchPlatform = platform;

    // Update tab styling
    document.querySelectorAll('.platform-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide platform content
    document.querySelectorAll('.platform-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById('platform-' + platform).classList.remove('hidden');
}

// Search on selected platform
function searchPlatform(platform) {
    const searchInput = document.getElementById(platform + '-search');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a search term');
        return;
    }

    // Encode the search query for URLs
    const encodedQuery = encodeURIComponent(query);
    let searchUrl = '';

    switch(platform) {
        case 'youtube':
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
            break;
        case 'reddit':
            searchUrl = `https://www.reddit.com/search/?q=${encodedQuery}`;
            break;
        case 'instagram':
            // Instagram search works differently - goes to explore/tags or direct to username
            if (query.startsWith('#')) {
                searchUrl = `https://www.instagram.com/explore/tags/${encodedQuery.substring(3)}/`;
            } else if (query.startsWith('@')) {
                searchUrl = `https://www.instagram.com/${encodedQuery.substring(3)}/`;
            } else {
                searchUrl = `https://www.instagram.com/explore/search/keyword/?q=${encodedQuery}`;
            }
            break;
        case 'facebook':
            searchUrl = `https://www.facebook.com/search/top?q=${encodedQuery}`;
            break;
        case 'substack':
            searchUrl = `https://substack.com/search/${encodedQuery}`;
            break;
    }

    // Save the search to saved items
    const searchItem = {
        id: Date.now(),
        platform: platform,
        query: query,
        url: searchUrl,
        timestamp: new Date().toLocaleString()
    };

    // Open search in new tab
    window.open(searchUrl, '_blank');

    // Optionally save this search automatically
    // addToSaved(searchItem);

    // Show option to save
    showSaveOption(searchItem);
}

// Show option to save a search
function showSaveOption(searchItem) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'action-box';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.innerHTML = `
        <p><strong>Search opened in new tab</strong></p>
        <p>Save "${searchItem.query}" on ${searchItem.platform} for later?</p>
        <button class="save-button" onclick="saveFromNotification(${searchItem.id})">Save for Later</button>
        <button class="button secondary" onclick="closeNotification()" style="margin-left: 10px; padding: 8px 16px; font-size: 0.9em;">Close</button>
    `;

    // Store the search item temporarily
    window.tempSearchItem = searchItem;

    document.body.appendChild(notification);

    // Auto-close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 10000);
}

// Save from notification
function saveFromNotification(id) {
    if (window.tempSearchItem) {
        addToSaved(window.tempSearchItem);
        closeNotification();
    }
}

// Close notification
function closeNotification() {
    const notifications = document.querySelectorAll('.action-box[style*="position: fixed"]');
    notifications.forEach(n => n.remove());
}

// Add item to saved list
function addToSaved(item) {
    // Check if already saved
    const exists = savedItems.some(saved =>
        saved.platform === item.platform && saved.query === item.query
    );

    if (exists) {
        alert('This search is already saved!');
        return;
    }

    savedItems.push(item);
    saveSavedItems();
    displaySavedItems();
}

// Display saved items
function displaySavedItems() {
    const savedList = document.getElementById('saved-list');

    if (savedItems.length === 0) {
        savedList.innerHTML = '<div class="empty-state">No saved items yet. Search something and save it for later.</div>';
        return;
    }

    let html = '';
    savedItems.forEach(item => {
        html += `
            <div class="saved-item">
                <div class="saved-item-content">
                    <h4>${item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}: ${item.query}</h4>
                    <p>Saved on: ${item.timestamp}</p>
                    <a href="${item.url}" target="_blank" class="search-link">Open Search</a>
                </div>
                <button class="remove-button" onclick="removeFromSaved(${item.id})">Remove</button>
            </div>
        `;
    });

    savedList.innerHTML = html;
}

// Remove item from saved list
function removeFromSaved(id) {
    savedItems = savedItems.filter(item => item.id !== id);
    saveSavedItems();
    displaySavedItems();
}

// Clear all saved items
function clearAllSaved() {
    if (savedItems.length === 0) {
        alert('No saved items to clear!');
        return;
    }

    if (confirm('Are you sure you want to clear all saved items? This cannot be undone.')) {
        savedItems = [];
        saveSavedItems();
        displaySavedItems();
    }
}

// Save to localStorage
function saveSavedItems() {
    localStorage.setItem('digitalMinimalismSavedSearches', JSON.stringify(savedItems));
}

// Load from localStorage
function loadSavedItems() {
    const stored = localStorage.getItem('digitalMinimalismSavedSearches');
    if (stored) {
        try {
            savedItems = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading saved items:', e);
            savedItems = [];
        }
    }
}

// Add keyboard support for search (Enter key)
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = ['youtube', 'reddit', 'instagram', 'facebook', 'substack'];
    searchInputs.forEach(platform => {
        const input = document.getElementById(platform + '-search');
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchPlatform(platform);
                }
            });
        }
    });
});
