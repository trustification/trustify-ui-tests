
Feature: License Explorer
	As a Platform Eng
	I want to be able to download the licenses in a CSV file format from a specific SBOM

Background:
	Given User is on TPA Application
	And User has successfully uploaded a SPDX SBOM from Upload SBOM page
	And Uploaded SPDX SBOM appears on Search List page under SBOMs tab

Scenario: Verify Download Licences option on SBOM Search Results page for SPDX SBOM
	Given User Searches for SPDX SBOM using Search Text box and Navigates to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks "Action" button
	Then "Download License Report" Option should be visible

Scenario: User Downloads license information for SPDX SBOM from SBOM Search Results page
	Given User Searches for SPDX SBOM using Search Text box and Navigates to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks "Action" button
	And Selects "Download License Report" option
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify Download Licences option on SBOM Explorer page for SPDX SBOM
	Given User Searches for SPDX SBOM using Search Text box and Navigates to Search results page
	When User Selects SPDX SBOM of interest from the Search Results
	And User Clicks on SBOM name hyperlink from the Search Results
	Then Application Navigates to SBOM Explorer page 
	And "Download License Report" Option should be visible

Scenario: User Downloads license information for SPDX SBOM from SBOM Explorer page
	Given User is on SBOM Explorer page for the SPDX SBOM
	And User Clicks on "Download License Report" button
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify the files on downloaded SPDX SBOM license ZIP
	Given User has Downloaded the License information for SPDX SBOM
	When User extracts the Downloaded license ZIP file
	Then Extracted files should contain two CSVs, one for Package license information and another one for License reference

Scenario: Verify the headers on SPDX SBOM package License CSV file
	Given User extracted the SPDX SBOM license compressed file
	When User Opens the package license information file
	Then The file should have the following headers - name, namespace, group, version, package reference, license, license name, license expression and alternate package reference

Scenario: Verify the headers on SPDX SBOM License reference CSV file
	Given User extracted the SPDX SBOM license compressed file
	When User Opens the license reference file
	Then The file should have the following headers - licenseId, name, extracted text and comment

Scenario: Verify the license information for a package with single license
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - rhoai-2.15.json package - pkg:rpm/redhat/popt@1.18-1.el8?arch=x86_64
	Given User is on SBOM license information file
	When User selects a package with Single license information
	Then name column should contain the value of name field from SBOM json
	And namespace column should contain the value of documentNamespace field from SBOM json
	And group column should be empty
	And version column should be empty
	And package reference column should contain the value of packages.externalRefs.referenceLocator field for purl referenceType from SBOM json
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the value from licenseDeclared field of the SBOM json
	And alternate package reference column should be empty

Scenario: Verify the license information for a package with single license with alternate package reference referenceLocator
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - RHOSE-4.14.json package - pkg:rpm/redhat/skopeo@1.11.3-4.rhaos4.14.el9?arch=src&epoch=2
	Given User is on SBOM license information file
	When User selects a package with Single license information
	Then name column should contain the value of name field from SBOM json
	And namespace column should contain the value of documentNamespace field from SBOM json
	And group column should be empty
	And version column should be empty
	And package reference column should contain the value of packages.externalRefs.referenceLocator field for purl referenceType from SBOM json
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the value from licenseDeclared field of the SBOM json
	And alternate package reference column should contain the value of packages.externalRefs.referenceLocator field for cpe referenceType from SBOM json

Scenario: Verify the license information for a package with multiple licenses with alternate package reference referenceLocator
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - RHOSE-4.14.json package - pkg:rpm/redhat/NetworkManager@1.42.2-24.el9_2?arch=src&epoch=1
	Given User is on SBOM license information file
	When User selects a package with multiple licenses information
	Then name column should contain the value of name field from SBOM json
	And namespace column should contain the value of documentNamespace field from SBOM json
	And group column should be empty
	And version column should be empty
	And package reference column should contain the value of packages.externalRefs.referenceLocator field for purl referenceType from SBOM json
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the whole value from licenseDeclared field of the SBOM json in a single row
	And alternate package reference column should contain the value of packages.externalRefs.referenceLocator field for cpe referenceType from SBOM json

Scenario: Verify SPDX SBOM level license information on license export
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - RHOSE-4.6.Z.json 
	Given User is on SBOM license information file
	Then name column should contain the value of name field from SBOM json
	And namespace column should contain the value of documentNamespace field from SBOM json
	And group column should be empty
	And version column should be empty
	And package reference column should be empty
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the whole value from licenseDeclared field in a single row for the packages entry of the SBOM
	And alternate package reference column should contain the value of packages.externalRefs.referenceLocator field for cpe referenceType from SBOM json

Scenario: Verify the contents on SPDX SBOM license reference CSV file
	Given User is on license reference file
	When User selects a license from the list of licenses
	Then Values hasExtractedLicensingInfos section of the SPDX SBOM json should be listed under the Reference CSV file
