const consoleAppStart = "Application has started...";

const consoleIntroText =
    `
============================================================
Before proceeding ensure following information is available:
- List of team members
- Team member information
    * Name
    * Role
    * ID
    NOTE: Managers (100-300)
          Engineers (200-400)
          Interns (700-900)
    * Email address
    * Office location number for Manager
    * GitHub username for Engineer
    * School name for Intern
============================================================
    `;


const consoleAddTeamMemberText =
    `
===========================
      Add Team Member
===========================
    `;

const consoleAddAnotherTeamMemberText =
    `
===========================
  Add another team member?
===========================
    `
    ;

module.exports = { consoleAppStart, consoleIntroText, consoleAddTeamMemberText, consoleAddAnotherTeamMemberText };