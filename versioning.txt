Semantic Versioning:
MAJOR.MINOR.PATCH (e.g. 24.2.1)

express = ^4.18.2

1st part: 4
2nd part: 18
3rd part: 2

3rd part: Minor fixes (Optional Update)

2nd part: Recommended bug fix (Security Fix)

1st part: Major Release / breaking update ( Only if you are starting new project else your project will break if you upgrade)

No symbol (4.18.2): now our version is locked you cannot upgrade your version using npm install or update you have to manually update the new version.
Caret symbol (^4.18.2): if there will be new version available and when you npm update than it will not update the (MAJOR) it will only change the (MINOR) or (PATCH).
Tilde symbol (~4.18.2): only (PATCH) version will be update (MAJOR) and (MINOR) both will not upgrade or change
