
Feature: License Explorer
	As a Platform Eng
	I want to be able to download the licenses in a CSV file format from a specific SBOM

Background:
	Given User is on TPA Application
	And User successfully uploaded a CycloneDX SBOM from Upload SBOM page
	And Uploaded CycloneDX SBOM appears on Search List page under SBOMs tab

Scenario: Verify Download Licences option on SBOM Search Results page for CycloneDX SBOM
	Given User Searches for CycloneDX SBOM using Search Text box and Navigates to Search results page
	When User Selects CycloneDX SBOM of interest from the Search Results
	And User Clicks "Action" button
	Then "Download Licences" Option should be visible

Scenario: User Downloads license information for CycloneDX SBOM from SBOM Search Results page
	Given User Searches for CycloneDX SBOM using Search Text box and Navigates to Search results page
	When User Selects CycloneDX SBOM of interest from the Search Results
	And User Clicks "Action" button
	And Selects "Download Licences" option
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify Download Licences option on SBOM Explorer page for CycloneDX SBOM
	Given User Searches for CycloneDX SBOM using Search Text box and Navigates to Search results page
	When User Selects CycloneDX SBOM of interest from the Search Results
	And User Clicks on SBOM name hyperlink from the Search Results
	Then Application Navigates to SBOM Explorer page 
	And "Download Licences" Option should be visible

Scenario: User Downloads license information for CycloneDX SBOM from SBOM Explorer page
	Given User is on SBOM Explorer page for the CycloneDX SBOM
	And User Clicks on "Download Licences" button
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify the files on downloaded CycloneDX SBOM license ZIP
	Given User has Downloaded the License information for CycloneDX SBOM
	When User extracts the Downloaded license ZIP file
	Then Extracted files should contain two CSVs, one for Package License combination and another one for License reference

Scenario: Verify the headers on CycloneDX SBOM package License CSV file
	Given User extracted the CycloneDX SBOM license compressed file
	When User Opens the package license combination file
	Then The file should have the following headers - name, namespace, group, version, package, reference license,license name and alternate package reference

Scenario: Verify the headers on CycloneDX SBOM License reference CSV file
	Given User extracted the CycloneDX SBOM license compressed file
	When User Opens the license reference file
	Then The file should have the following headers - licenseId, name, extracted text and comment

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license
	Given User is on package license combination file
	When User selects a package with Single license information
	Then name column should contain the value of component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of component.group field from SBOM json
	And version column should contain the value of component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should contain the value of components.license.id field from SBOM json
	And license name column should contain the value of components.license.name field from SBOM json
	And alternate package reference column should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with multiple licenses
	Given User is on package license combination file
	When User selects a package with multiple license information
	Then Package should have Rows equivalent to number of licenses
	And All the package rows should be loaded with identical values for the columns name, namespace, group, version, package
	And License column should be loaded with the unique licenses of the package from SBOM json

Scenario: Verify the contents on CycloneDX SBOM license reference CSV file
	Given User is on license reference file
	When User selects a license from the list of licenses
	Then The License reference CSV should be empty
