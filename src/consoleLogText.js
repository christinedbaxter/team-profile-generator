const consoleIntroText =
    `
====================================================
Managers, ensure following information is available:

- List of team members, including yourself
- Team member information
    * Name
    * Role
    * ID
    NOTE: Managers  (100-300)
          Engineers (400-600)
          Interns   (700-900)
    * Email address
    * Office location number for Manager
    * GitHub username for Engineer
    * School name for Intern
====================================================
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

module.exports = { consoleIntroText, consoleAddTeamMemberText, consoleAddAnotherTeamMemberText };