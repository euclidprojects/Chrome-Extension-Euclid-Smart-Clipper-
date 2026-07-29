# Chrome Web Store Privacy Practices & Compliance Justifications

## A. SINGLE PURPOSE DESCRIPTION

Euclid Smart Clipper enables users to capture webpages, screenshots, bookmarks, simplified articles and timestamped YouTube notes, annotate captured content, and save the resulting clips to their Euclid Smart Notes account.

## B. PERMISSION JUSTIFICATIONS

### activeTab
Euclid Smart Clipper uses activeTab only after the user opens the extension or chooses a clipping action. It provides temporary access to the current tab for capturing screenshots, extracting user-selected webpage content, detecting the current page and creating a clip.

### contextMenus
The contextMenus permission provides user-initiated right-click commands for saving selected text, links, images or the current webpage to Euclid Smart Notes.

### offscreen
The offscreen permission is used to create a temporary offscreen document for the Firebase and Google authentication process because extension service workers do not provide the document environment required for this authentication flow. It is used only during authentication.

### scripting
The scripting permission is used after the user requests a clipping action. It injects the scripts required for selected-area screenshots, webpage content extraction, simplified article processing and clipping controls.

### sidePanel
The sidePanel permission displays the clipping interface alongside the current webpage so users can configure and save clips without leaving the page.

### storage
The storage permission stores extension preferences and temporary working information, including selected clipping mode, notebook and folder selections, interface settings and unsaved clip information. It is not used to store passwords.

### tabs
The tabs permission is used to obtain the current tab title and URL, identify supported pages such as YouTube videos, coordinate screenshot capture and populate clip information after the user opens the extension. It is not used to collect general browsing history.

### Host Permissions (`https://www.youtube.com/*`, `https://youtu.be/*`, `https://music.youtube.com/*`, `https://*.firebaseapp.com/*`, `https://*.firebaseio.com/*`, `https://*.googleapis.com/*`, `https://*.euclidprojects.org/*`, `https://euclidprojects.org/*`)
Host permissions allow Euclid Smart Clipper to access the webpage that the user explicitly chooses to clip. Access is used for screenshot capture, webpage content extraction, simplified article creation, bookmarks, page metadata and timestamped YouTube notes. The extension does not continuously monitor browsing activity.

## C. REMOTE CODE DECLARATION

**Remote Code Selection:** No, I am not using remote code.

**Explanation:**
Euclid Smart Clipper does not download or execute remotely hosted JavaScript or WebAssembly. All executable extension code and required libraries, including Firebase libraries, are packaged inside the submitted extension. External services are accessed only through HTTPS API and data requests.

## D. DATA DISCLOSURE RECOMMENDATIONS

In the Chrome Web Store Developer Dashboard -> Privacy practices tab, select the following data disclosure categories:

1. **Personally identifiable information**:
   - *Reason*: Name and email address used for Firebase user account registration and authentication.
2. **Authentication information**:
   - *Reason*: Auth tokens/credentials used to verify the user's identity when accessing their Euclid Smart Notes database.
3. **Website content**:
   - *Reason*: Text clips, webpage titles, URLs, screenshot images, and simplified article text explicitly selected or captured by the user during a clipping operation.
4. **User-provided content**:
   - *Reason*: Note titles, remarks, tags, notebook and folder selections created directly by the user.

*Note: Euclid Smart Clipper DOES NOT sell user data, use data for personalized advertising, or transfer data for creditworthiness or unrelated third-party purposes.*

## E. LIMITED USE CERTIFICATION CHECKLIST

- [x] User data is used strictly to provide and improve the core clipping and note-saving functionality.
- [x] User data is not sold or transferred to data brokers.
- [x] User data is not used or transferred for personalized advertising or targeting.
- [x] User data is not transferred for unrelated third-party purposes.
- [x] User data is not used for creditworthiness, lending, or financial evaluation.
- [x] Data handling complies with the Chrome Web Store Limited Use policy requirements.

## F. STORE LISTING URLs

- **Homepage URL**: https://euclidprojects.org/
- **Support URL**: https://euclidprojects.org/contact
- **Privacy Policy URL**: https://euclidprojects.org/privacy
