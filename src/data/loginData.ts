type loginResponseType = {
  access_token: string
  token_type: string
}

export const loginLawyerResponse: loginResponseType = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXhhQGdtYWlsLmNvbSIsImlkIjoyNSwicm9sZSI6Imxhd3llciIsImV4cCI6MTc3NjU3NzUxOX0.Hivt2JuH8RGq0Y4fqjraOSC3ZUx-9fe4zKwa29eeySg",
  token_type: "bearer",
}

export const loginAdminResponse: loginResponseType = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXhhQGdtYWlsLmNvbSIsImlkIjoyNSwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzc2NTc3NTE5fQ.wYELLUP-ZtiyrW_6BQevek9ctiqgsy0c_zonptsKpFE",
  token_type: "bearer",
}

export const loginStaffResponse: loginResponseType = {
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYXhhQGdtYWlsLmNvbSIsImlkIjoyNSwicm9sZSI6InN0YWZmIiwiZXhwIjoxNzc2NTc3NTE5fQ.wC42MV8pRqvO6GPYXbJ7mIMod34yjqr0S9N2sKPn_EE",
  token_type: "bearer",
}
