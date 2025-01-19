Feature: Importer Explorer - View and configure importers on importers details page
  Background:
      Given: The user navigates to TPA URL and logs into the TPA application

Scenario: The user navigates to Importers Explore page
  Given the user navigates to TPA URL page successfully
  When the user selects the importers menu option
  Then application navigates to Importers page
  And the column headers Name, Type, Description, Source, Period and Status should be visible
  And And Call to Action button for each importer should be visible

Scenario: The user can check pagination controls on importers page
  Given the user navigates to TPA URL page successfully
  When the user selects the importers page from left navigation menu option
  Then the importers page will be displayed with pagination controls with correct values
  And it will be possible to move between pages accordingly
  And it will be possible to add page numbers in the pagination text box and pressing Enter to move to the desired page

Scenario: The user can see that the search box appears in importers page
  Given the user navigates to TPA URL page successfully
  When the user selects the importers menu option
  Then there will be a search text box displayed

Scenario: The user can search a text in search text box
  Given the user navigates to TPA URL page successfully
  When the user types a search string in the search text box and clicks the magnifying glass icon
  Then only the related search results will be displayed in the importers page

Scenario: The user can search a text in search text box with pressing 'Enter' in the keyboard
  Given the user navigates to TPA URL page successfully
  When the user types a search string in the search text box and presses Enter in the keyboard
  Then only the related search results will be displayed in the importers page

Scenario: The user can expand an importer to see its logs
  Given the importers option is selected on the left menu
  When the user the user expands an importer row
  Then the importer row will be expanded
  And the following log fields will be displayed: ‘Start Date’, End Date’, Number of items’, ‘Error’
  And there will be pagination controls under the expanded importer row

Scenario: When the user clicks on the Call to Action button he can see the relevant options
  Given the importers option is selected on the left menu
  When the user clicks on the Call to Action icon
  Then the following options will be displayed: Enable/Disable, Delete, Add/Create Importer and Edit

Scenario: The user is able to disable an enabled importer
  Given the user has clicked on the Call to Action button under an importer
  When the user selects the option Disable on an enabled importer
  Then there will be a label of ‘Disabled’ displayed under the specific importer
  And the specific importer will stop functioning and importing objects(SBOMs/CVEs/CSAF files)

Scenario: The user is not able to disable an already disabled importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option Disable on a disabled importer
  Then the ‘Disable’ option will be greyed out (disabled)
  And it will not be possible to change the status to ‘Disabled’

Scenario: The user is able to enable a disabled importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option Enable on a disabled importer
  Then there will be a label of ‘Enabled’ displayed under the specific importer
  And there will be a confirmation message about the importer being enabled
  And the importer will start running and importing the objects(SBOMs/CVEs/CSAF files)

Scenario: The user is not able to enable an already enabled importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option Enable on an enabled importer
  Then the ‘Enable’ option will be greyed out (disabled)
  And it will not be possible to change the status to ‘Enabled'

Scenario: The user selects to delete an importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option ‘Delete’ on an importer
  Then there will be a confirmation message for the deletion operation
  And there will be buttons of ‘OK’ or ‘Cancel’ in the confirmation message

Scenario: The user deletes an existing importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option ‘Delete’ on an importer and clicks ‘OK’ in the confirmation message
  Then the importer will be deleted successfully and will not be displayed anymore in the importers page

Scenario: The user clicks on 'Delete' and then clicks 'Cancel'
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option ‘Delete’ on an importer and clicks ‘Cancel’ in the confirmation message
  Then the importer will be not be deleted and will still be displayed in the importers page
  And it will be possible to click on the three dots icon and configure the importer

Scenario: The user clicks on 'Add/Create' an importer under the hamburger icon
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects the option ‘Add/Create’ on an importer
  Then there will be a pop up dialog window for adding a new importer
  And it will be possible to configure the following parameters: Type (SBOM, CSAF, OSV, CVE), Name, Description, Enable/Disable, Source, Period (exact m/h/d/w/y) and an ‘Add key’ button
  And there will be two buttons at the bottom of the page: ‘Create’ and ‘Cancel’

Scenario: The user clicks on 'Create Importer' button on the importers main page
  Given the user is in the importers main page
  When the user has clicked on the ‘Create importer’ button on the importers page
  Then there will be a pop up dialog window for adding a new importer
  And it will be possible to configure the following parameters: Type (SBOM, CSAF, OSV, CVE), Name, Description, Enable/Disable, Source, Period (exact m/h/d/w/y) and an ‘Add key’ button
  And there will be two buttons at the bottom of the page: ‘Create’ and ‘Cancel’

Scenario: The user tries to add a new importer without filling any field in the importer form
  Given the user has selected to add a new importer
  When the user leaves all the fields empty and clicks on ‘Create’ button
  Then the ‘Create’ button will be disabled and the ‘Cancel’ button will be enabled
  And it will not be possible to create a new importer

Scenario: The user adds a new importer
  Given the user has selected to add a new importer
  When the user fills all the mandatory fields and clicks the ‘Create’ button
  Then the importer will be created successfully and displayed in the importers page
  And all the parameters added to the importers will be displayed accordingly

Scenario: The user tries to add a new importer and clicks 'Cancel'
  Given the user has selected to add a new importer
  When the user fills all the mandatory fields and clicks the ‘Cancel’ button
  Then the importer will not be created  and will not be displayed in the importers page
  And it will not be possible to find the importer while searching it in the importers page

Scenario: The user tries to edit an existing importer
  Given the user has clicked on the Call to Action icon under an importer
  When the user selects ‘Edit’ option on an existing importer
  Then there will be a pop up dialog window for editing the selected importer
  And there will be two buttons in the bottom of the pop up dialog window: ‘Save’ and ‘Cancel’
  And it will be possible to update all the fields in the importer dialog box

Scenario: The user is in editing mode of an importer but does not update anything
  Given the user has selected to update an importer
  When the user does not change anything in the dialog window
  Then the ‘Save’ button will be disabled and the ‘Cancel’ button will be enabled

Scenario: The user updated an existing importer
  Given the user has selected to update an importer
  When the user does not change anything in the dialog window and clicks ‘Cancel’
  Then no changes will be done to the importer
  And the importer will be displayed with the same data in the importers page