
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
	Then "Download License Report" Option should be visible

Scenario: User Downloads license information for CycloneDX SBOM from SBOM Search Results page
	Given User Searches for CycloneDX SBOM using Search Text box and Navigates to Search results page
	When User Selects CycloneDX SBOM of interest from the Search Results
	And User Clicks "Action" button
	And Selects "Download License Report" option
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify Download Licences option on SBOM Explorer page for CycloneDX SBOM
	Given User Searches for CycloneDX SBOM using Search Text box and Navigates to Search results page
	When User Selects CycloneDX SBOM of interest from the Search Results
	And User Clicks on SBOM name hyperlink from the Search Results
	Then Application Navigates to SBOM Explorer page 
	And "Download License Report" Option should be visible

Scenario: User Downloads license information for CycloneDX SBOM from SBOM Explorer page
	Given User is on SBOM Explorer page for the CycloneDX SBOM
	And User Clicks on "Download License Report" button
	Then Licenses associated with the SBOM should be downloaded in ZIP format using the SBOM name

Scenario: Verify the files on downloaded CycloneDX SBOM license ZIP
	Given User has Downloaded the License information for CycloneDX SBOM
	When User extracts the Downloaded license ZIP file
	Then Extracted files should contain two CSVs, one for Package license information and another one for License reference

Scenario: Verify the headers on CycloneDX SBOM package License CSV file
	Given User extracted the CycloneDX SBOM license compressed file
	When User Opens the package license information file
	Then The file should have the following headers - name, namespace, group, version, package reference, license, license name, license expression and alternate package reference

Scenario: Verify the headers on CycloneDX SBOM License reference CSV file
	Given User extracted the CycloneDX SBOM license compressed file
	When User Opens the license reference file
	Then The file should have the following headers - licenseId, name, extracted text and comment

Scenario: Verify the contents on CycloneDX SBOM license reference CSV file
	Given User is on license reference file
	When User selects a license from the list of licenses
	Then The License reference CSV should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license id
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package - pkg:maven/io.quarkus/quarkus-resteasy@2.13.7.Final?type=jar
	Given User is on SBOM license information file
	When User selects a package with Single license id
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should contain the value of components.license.id field from SBOM json
	And license name column should be empty
	And license expression column should be empty
	And alternate package reference column should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license id with alternate package reference
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - tc_1730_license_escape.json package - pkg:pkg:npm/%40gradio/accordion@0.3.4
	Given User is on SBOM license information file
	When User selects a package with Single license id with cpe information
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should contain the value of components.license.id field from SBOM json
	And license name column should be empty
	And license expression column should be empty
	And alternate package reference column should contain the value of CPE from components.cpe field from SBOM json

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license name
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package - pkg:maven/org.bouncycastle/bcpkix-jdk15on@1.68?type=jar
	Given User is on SBOM license information file
	When User selects a package with Single license name
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should be empty
	And license name column should contain the value of license name from components.license.name field from SBOM json
	And license expression column should be empty
	And alternate package reference column should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license name with alternate package reference
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - tc_1730_license_escape.json package - pkg:pypi/PyGObject@3.40.1
	Given User is on SBOM license information file
	When User selects a package with Single license name with cpe information
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should be empty
	And license name column should contain the value of license name from components.license.name field from SBOM json
	And license expression column should be empty
	And alternate package reference column should contain the value of CPE from components.cpe field from SBOM json

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license expression
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package - pkg:maven/javax.activation/javax.activation-api@1.2.0?type=jar
	Given User is on SBOM license information file
	When User selects a package with Single license expression
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the value of whole license expression in a single row from components.license.expression field from SBOM json
	And alternate package reference column should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with single license expression with alternate package reference
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - tc_1730_license_escape.json package - pkg:rpm/rhel/annobin@12.31-2.el9?arch=x86_64&upstream=annobin-12.31-2.el9.src.rpm&distro=rhel-9.4
	Given User is on SBOM license information file
	When User selects a package with Single license expression with cpe information
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of components.purl from SBOM json
	And license column should be empty
	And license name column should be empty
	And license expression column should contain the value of whole license expression in a single row from components.license.expression field from SBOM json
	And alternate package reference column should contain the value of CPE from components.cpe field from SBOM json

Scenario: Verify the license information for a package on the CycloneDX SBOM with multiple license ids
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package - pkg:maven/jakarta.el/jakarta.el-api@3.0.3?type=jar
	Given User is on SBOM license information file
	When User selects a package with multiple license sections
	Then The report should have multiple rows for the same package corresponding to each license section
	And Values on columns name, namespace, group, version, package reference, license name, license expression and alternate package reference should be same for all the rows
	And Column license id for each row should contain the value from the components.license.id field of the corresponding license section

Scenario: Verify the license information for a package on the CycloneDX SBOM with multiple license names
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package - pkg:maven/xpp3/xpp3_min@1.1.4c?type=jar
	Given User is on SBOM license information file
	When User selects a package with multiple license sections
	Then The report should have multiple rows for the same package corresponding to each license section
	And Values on columns name, namespace, group, version, package reference, license id, license expression and alternate package reference should be same for all the rows
	And Column license name for each row should contain the value from the components.license.name field of the corresponding license section

Scenario: Verify the license information for a package on the CycloneDX SBOM with license id and license name
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json package -pkg:maven/ch.qos.logback/logback-core@1.1.10?type=jar
	Given User is on SBOM license information file
	When User selects a package with multiple license sections
	Then The report should have multiple rows for the same package corresponding to each license section
	And Values on columns name, namespace, group, version, package reference, license expression and alternate package reference should be same for all the rows
	And Column license id should contain the value of components.license.id field on one row and on the same row license.name column should be empty
	And Column license name should contain the value of the components.license.name on another row and on the same row license.id column should be empty

Scenario: Verify CycloneDX SBOM level license information on license export
	# Test data https://drive.google.com/drive/folders/1Z6y6gMegutBeUuc_8LkpYxKeGz_KYG9H?usp=drive_link
	# sbom - cdx_sbom.json
	Given User is on SBOM license information file
	Then name column should contain the value of SBOM name from metadata.component.name field from SBOM json
	And namespace column should be empty
	And group column should contain the value of metadata.component.group field from SBOM json
	And version column should contain the value of metadata.component.version field from SBOM json
	And package reference column should contain the value of metadata.component.purl from SBOM json
	And license column should contain the value from metadata.component.licenses.license.id field of the SBOM json
	And license name column should be empty
	And license expression column should be empty
	And alternate package reference column should be empty

Scenario: Verify the license information for a package on the CycloneDX SBOM with multiple licenses
	Given User is on SBOM license information file
	When User selects a package with multiple license information
	Then Package should have Rows equivalent to number of licenses
	And All the package rows should be loaded with identical values for the columns name, namespace, group, version, package
	And License column should be loaded with the unique licenses of the package from SBOM json
