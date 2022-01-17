Feature: User Auth

    As a user I should be able to "signup" to the my-money app with valida email address
    and valid password: Capital letter, Lower case letter, a number, special charactere(@#$%) and size between 6-20.

    Rule: User Signup to the my-money app

        Scenario: Signup with valid email address and password
            Given I make a POST request to http://localhost:3003/oapi/signup
            And I set form to
                """
                {
                    "name": "user024",
                    "email": "user025@gmail.com",
                    "password": "a2@User124",
                    "confirm_password": "a2@User124"
                }
                """
            When I receive a response
            Then I expect response should have a status 200
            And I expect response should have a json like
                """
                {
                    "name": "user024",
                    "email": "user024@gmail.com"
                }
                """
