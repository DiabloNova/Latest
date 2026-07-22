# 11. Settings Architecture
## AI Brand Intelligence & Visibility Platform

This settings architecture defines our application settings, layout hierarchies, and configuration parameters. It details the administrative structures across user profiles, organizations, workspaces, and security settings to ensure that both local startups and global enterprises can configure the platform to match their workflows.

---

## 11.1 Settings Layout Hierarchy

Settings are organized across eight distinct levels:

```
+-----------------------------------------------------------------------------------------+
|                                    SETTINGS HIERARCHY                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. User Settings      ===> Profile, Interface Language (FA/EN), Email Preferences      |
|   2. Org Settings       ===> Organization Name, Consolidated Billing, SSO Config         |
|   3. Workspace Settings ===> Workspace Name, Isolated timezone, Data Retentions          |
|   4. Brand Settings     ===> Brand Name, Primary Domain, Competitors, Wikidata Mapping  |
|   5. Notification Set   ===> Slack/Slack channels, Instant alerting rules, weekly digests|
|   6. Security Settings  ===> Multi-Factor Auth (MFA), IP Whitelisting, Password Policies|
|   7. API Settings       ===> Key creation & rotations, webhook URLs, Rate limits        |
|   8. Localization Set   ===> Local calendar selectors, RTL alignment rules              |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 11.2 Architectural Configuration Specification

### 11.2.1 User Settings
*   **Purpose**: Manage personal profile details, account credentials, and display preferences.
*   **Key Parameters**:
    *   `first_name`, `last_name` (Strings).
    *   `email_address` (String, requires verification).
    *   `preferred_language` (Enum: Persian, English, Arabic).
    *   `timezone` (String, defaults to browser local timezone).
    *   `avatar_image_url` (String, cloud storage path).

### 11.2.2 Organization Settings
*   **Purpose**: Manage the parent organization details, consolidated billing plans, and global security policies.
*   **Key Parameters**:
    *   `organization_name` (String).
    *   `subscription_tier_id` (UUID).
    *   `billing_contact_email` (String).
    *   `payment_currency` (Enum: IRR, AED, SAR, USD).
    *   `sso_enabled` (Boolean, unlocks SAML/Okta configuration panel).

### 11.2.3 Workspace Settings
*   **Purpose**: Manage isolated team configurations, regional timezone variations, and data retention rules.
*   **Key Parameters**:
    *   `workspace_name` (String).
    *   `workspace_timezone` (String, controls cron scheduler execution timings).
    *   `data_retention_days` (Integer, defaults to 365 days; customizable for Enterprise accounts).
    *   `default_reporting_recipients` (Array of Emails).

### 11.2.4 Brand Settings
*   **Purpose**: Configure the target brand profile, product domains, and entity mapping parameters.
*   **Key Parameters**:
    *   `brand_name` (String).
    *   `primary_domain` (String, domain validation required).
    *   `target_product_skus` (Array of Strings).
    *   `executive_leaders` (Array of Strings).
    *   `wikidata_id_reference` (String, used to pull semantic knowledge graph connections).
    *   `competitors` (Array of competitor domains).

### 11.2.5 Notification Settings
*   **Purpose**: Configure instant alerting thresholds, channel connections, and scheduled digests.
*   **Key Parameters**:
    *   `slack_webhook_url` (String, secure Slack integration).
    *   `microsoft_teams_webhook_url` (String).
    *   `weekly_digest_enabled` (Boolean).
    *   `instant_alerting_threshold` (Enum: Off, High Priority Only, All Changes).
    *   `notified_user_ids` (Array of User UUIDs).

### 11.2.6 Security Settings
*   **Purpose**: Manage identity security, Multi-Factor Authentication (MFA) rules, and network boundaries.
*   **Key Parameters**:
    *   `mfa_required` (Boolean, organization-wide policy).
    *   `ip_whitelisted_ranges` (Array of CIDR Strings, restricts dashboard login locations).
    *   `session_timeout_minutes` (Integer, automatically logs out inactive users).
    *   `password_expiration_days` (Integer, forces periodic password updates).

### 11.2.7 API Settings
*   **Purpose**: Manage developer integrations, API access keys, and webhook pipelines.
*   **Key Parameters**:
    *   `active_api_keys` (Array of objects containing truncated key hashes and creation dates).
    *   `webhook_destination_url` (String, target client-side server).
    *   `webhook_secret_key` (String, used to sign HTTP POST payloads).
    *   `api_rate_limit_per_minute` (Integer, customizable for Enterprise accounts).

### 11.2.8 Localization Settings
*   **Purpose**: Customize layout formats, calendar dates, and language parameters to match regional workspaces.
*   **Key Parameters**:
    *   `calendar_system` (Enum: Gregorian, Solar Hijri / Jalali for Phase 1 Iran).
    *   `layout_direction` (Enum: LTR, RTL).
    *   `number_formatting` (Enum: Western digits [123], Persian digits [۱۲۳]).
