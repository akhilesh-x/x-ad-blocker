# X Ad Blocker

**AD FREE SCROLLING**

X Ad Blocker is a Chrome extension that blocks promoted posts (ads) on X.com (formerly Twitter), providing a cleaner browsing experience.

![X Ad Blocker Logo](icons/icon128.png)

## Features

- **Block Ads**: Automatically hides promoted posts on X.com/Twitter.
- **Toggle Visibility**: Show/hide individual ads with a simple click.
- **Non-intrusive**: Simple placeholders inform you when ads are hidden.
- **Lightweight**: Minimal resource usage, no performance impact.
- **Privacy Focused**: Zero data collection, works entirely client-side.

## Installation

### Manual Installation
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked"
5. Select the folder containing the extension files

## How It Works

The extension runs only on X.com and Twitter.com domains. It:
1. Scans the page for elements that match ad patterns
2. Places a small placeholder where ads are detected
3. Provides buttons to show/hide individual ads if needed

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT track browsing history
- Does NOT communicate with any external servers
- Only stores your preference for showing placeholders locally

See [PRIVACY.md](PRIVACY.md) for our complete privacy policy.

## Permissions

- **storage**: To remember your settings (show placeholders or not)
- **host permissions for twitter.com and x.com**: To run only on these sites

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests.

## Disclaimer

This extension is not affiliated with X Corp. (formerly Twitter, Inc.)
It may stop working if X changes its website structure. 