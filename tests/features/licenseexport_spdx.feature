
Feature: License Explorer
    As a Platform Eng
    I want to be able to download the licenses in a csv file format from a specific SBOM

Background:
    Given User is on TPA Application
	And User successfully uploaded a SPDX SBOM from Upload SBOM page
	And Uploaded SPDX SBOM appears on Search List page under SBOMs tab

Scenario: Verify Download Licences option on SBOM Search Results page for SPDX SBOM
	Given User Searches for SPDX SBOM using Search Text box and Navigated to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks Action button
	Then Download Licences Option should be visible

Scenario: User Downloads license information for SPDX SBOM from SBOM Search Results page
	Given User Searches for SPDX SBOM using Search Text box and Navigated to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks Action button and Selects Download Licenses option
	Then Licenses associated with the SBOM should be downloaded in zip format using the SBOM name

Scenario: Verify Download Licences option on SBOM Explorer page for SPDX SBOM
	Given User Searches for SPDX SBOM using Search Text box and Navigated to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks on SBOM name hyperlink from the Search Results
	Then Application Navigates to SBOM Explorer page 
	And Download Licences Option should be visible

Scenario: User Downloads license information for SPDX SBOM from SBOM Explorer page
	Given User is on SBOM Explorer page for the SPDX SBOM
	And User Clicks on Download Licences button
	Then Licenses associated with the SBOM should be downloaded in zip format using the SBOM name

Scenario: Verify the files on downloaded SPDX SBOM license zip
	Given User Downloaded the License information for SPDX SBOM
	When User extracts the Downloaded license zip file
	Then Extracted files should contain two CSVs, one for Package License combination and another one for License reference

Scenario: Verify the headers on SPDX SBOM package License CSV file
	Given User extracted the SPDX SBOM license compressed file
	When User Opens the package license combination file
	Then The file should have the headers - name, namespace, group, version, package, reference license,license name and alternate package reference

Scenario: Verify the headers on SPDX SBOM License reference CSV file
	Given User extracted the SPDX SBOM license compressed file
	When User Opens the license reference file
	Then The file should have the headers - licenseId, name, extracted text and comment

Scenario: Verify the license information for a package with single license
	Given User is on package license combination file
	When User selects a packages with Single license information
	Then name column should contain the value of name field from SBOM json
	And namespace column should contain the value of documentNamespace field from SBOM json
	And group column should be empty
	And version column should be empty
	And package reference column should contain the value of packages.externalRefs.referenceLocator field for purl referenceType from SBOM json
	And license column should contain the value of packages.licenseDeclared field from SBOM json
	And license name column should be populated in reference to license reference CSV file
	And alternate package reference column should contain the arrays of values of packages.externalRefs.referenceLocator field for referenceType other than purl

Scenario: Verify the license information for a package with multiple licenses
	Given User is on package license combination file
	When User selects a packages with multiple license information
	Then Package should have Rows equivalent to number of licenses
	And All the package rows should loaded with identical values for the columns name, namespace, group, version, package
	And License column should be loaded with the unique licenses of the package from SBOM json

Scenario: Verify the contents on SPDX SBOM license reference CSV file
	Given User is on license reference file
	When User selects a license from the list of license
	Then The unique values of licenceDeclared field from SPDX SBOM file should be listed
	And licenseid column should be loaded with unique license id
	And license column should be loaded with the name of the license
	And extracted text and comment columns should be loaded in reference to the template file
