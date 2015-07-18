#!/bin/bash
#


export URL="https://api.trello.com/1"
export CDS="/cards"
export MBS="/members"
export BDS="/boards"
export LST="/lists"
# export NAME="ygyg"
# export LIST="ygyg"
# export FIELDS='{"key":"${TRELLO_KEY}"}, "token":"${TRELLO_TOKEN_A}", "name"="${NAME}", "idList":"${LIST}"}';

export ACCESS="key=${TRELLO_KEY}&token=${TRELLO_TOKEN_A}"

# export URL="http://petstore.swagger.io/v2"
# export FULLURL="${URL}/pet/findByStatus?status=pending"
# curl -H "Content-Type: application/json" \
#      -X GET ${FULLURL} \
#     | python -m json.tool

# export METHOD="POST"
# export PAYLOAD='"{
#   \"id\": 0,
#   \"category\": {
#     \"id\": 0,
#     \"name\": \"string\"
#   },
#   \"name\": \"doggie\",
#   \"photoUrls\": [
#     \"string\"
#   ],
#   \"tags\": [
#     {
#       \"id\": 0,
#       \"name\": \"string\"
#     }
#   ],
#   \"status\": \"available\"
# }"'

# export FULLURL="${URL}/pet"
# curl -H "Accept: application/json" \
#    -X "POST" -d '{"name":"doggie"}' ${FULLURL}

# export FULLURL="${URL}/pet/1436376002442"
# curl -H "Accept: application/json" \
#    -X GET ${FULLURL}
#  | python -m json.tool

# export HEADER='--header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer d3c4d1f362fd6c7b96dc3fe1375db6db"'
# export PAYLOAD='{  "id": 0, "category": {  "id": 0,  "name": "string" }, "name": "Red Lipped Batfish", "photoUrls": [  "string" ], "tags": [  { "id": 0, "name": "string"  } ], "status": "available" }'
# curl -X POST ${HEADER} -d ${PAYLOAD} "http://petstore.swagger.io/v2/pet?api_key=special-key"
# curl -X POST \
#     --header "Content-Type: application/json" \
#     --header "Accept: application/json" \
#     --header "Authorization: Bearer d3c4d1f362fd6c7b96dc3fe1375db6db" \
#     -d "{  \"name\": \"Sea Cucumber\", \"status\": \"available\" }" \
#     "http://petstore.swagger.io/v2/pet?api_key=special-key"

# curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer d3c4d1f362fd6c7b96dc3fe1375db6db" -d "{  \"id\": 0, \"category\": {  \"id\": 0,  \"name\": \"string\" }, \"name\": \"Sea Cucumber\", \"photoUrls\": [  \"string\" ], \"tags\": [  { \"id\": 0, \"name\": \"string\"  } ], \"status\": \"available\" }" "http://petstore.swagger.io/v2/pet?api_key=special-key"





# # # #   Get Member 'me' (with boards list)
# export FULLURL="${URL}${MBS}/me?${ACCESS}"
# echo curl -H '${HEAD}' -X GET ${FULLURL}
# curl -H '${HEAD}' -X GET ${FULLURL}    | python -m json.tool

#     # Board Aa : INJHXXtv  "556b59174b3e963b6cac41c5",


# # # #   Get Board 'Aa' by ID
export FULLURL="${URL}${BDS}/556b59174b3e963b6cac41c5?${ACCESS}"
export rslt=$(curl -H '${HEAD}' -X GET ${FULLURL})
echo ${rslt} | python -m json.tool

# # # #   Get Board 'Aa' by shortcut (with cards)
# export FULLURL="${URL}${BDS}/INJHXXtv?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X GET ${FULLURL})
# echo ${rslt} | python -m json.tool

# # # #   Create board 'AB!'
# export FULLURL="${URL}${BDS}/?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X POST -d '{"name":"AB!"}' ${FULLURL})
# echo ${rslt} | python -m json.tool

# # # #   Get Board 'AB!' by shortcut
# export METHOD="GET"
# export CMD_PATH="${BDS}/pA0XNWep"
# export FULLURL="${URL}${CMD_PATH}?${ACCESS}"
# echo curl -H ${HEAD} -X ${METHOD} ${FULLURL}
# echo $(curl -H ${HEAD} -X ${METHOD} ${FULLURL})
# | python -m json.tool

# # # #   Update board 'AB!' name to "AB"
# export METHOD="PUT"
# export CMD_PATH="${BDS}/pA0XNWep/name"
# export FULLURL="${URL}${CMD_PATH}?${ACCESS}"
# export PAYLOAD="'{\"value\":\"AB\"}'"
# echo ${PAYLOAD}
# echo $(curl -H ${HEAD} -X ${METHOD} -d ${PAYLOAD} ${FULLURL})

# | python -m json.tool





# # # #   Create list 'ABListA' by shortcut (with cards)

export METHOD="POST"
export PAYLOAD="{\"name\":\"ABListG\"}"
export FULLURL="${URL}${BDS}/INJHXXtv${LST}?${ACCESS}"
echo --------------------------------------------------------------------
echo curl --verbose -X ${METHOD} -H "Content-Type: application/json" -d ${PAYLOAD} ${FULLURL}
echo --------------------------------------------------------------------
# curl --verbose -X ${METHOD} --header "Content-Type: application/json" --header "Accept: application/json" \
#    -d "{\"name\": \"ABListF\",\"pos\": \"top\"}" ${FULLURL} \
#   | python -m json.tool


curl -X POST --verbose \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
     -d "{\"name\": \"AbListIII\"}" \
"http://trello.com/1/boards/INJHXXtv/lists?key=dc7bb1d947ba9b50862042d0a71245c7&token=70def6a86747f859066c85999d493af55dde318f2db54239f873755f4d33eb3c"
#     -d "{\"name\": \"AbListH\",  \"pos\": \"top\"}" \


# curl -X POST --header "Content-Type: application/json" \
#              --header "Accept: application/json" \
#              -d "top"
# "http://api.trello.com/1/boards/INJHXXtv/lists?key=dc7bb1d947ba9b50862042d0a71245c7&token=70def6a86747f859066c85999d493af55dde318f2db54239f873755f4d33eb3c"






# curl -X POST --verbose \
#      --header "Content-Type: application/json" \
#      --header "Accept: application/json" \
#     -d "{  \"name\": \"Sea Cucumber\", \"pos\": \"top\" }" \
#     "http://api.trello.com/1/boards/pA0XNWep/lists?key=dc7bb1d947ba9b50862042d0a71245c7&token=70def6a86747f859066c85999d493af55dde318f2db54239f873755f4d33eb3c"

# export METHOD="PUT"
# export PAYLOAD="{\"value\":\"ABListAB\"}"
# export FULLURL="${URL}${LST}/559d0d793a41152c704993a3/name?${ACCESS}"
# curl -H "Content-Type: application/json" \
#    -X ${METHOD} -d ${PAYLOAD} ${FULLURL} \
#    | python -m json.tool



# curl -H '${HEAD}' -X ${METHOD} -d ${PAYLOAD} ${FULLURL})
# echo ${rslt}


# # # #   Get Card 'AaCard' by shortcut (with cards)
# export FULLURL="${URL}${CDS}/Fj4nK3on?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X GET ${FULLURL})
# echo ${rslt} | python -m json.tool

# # # #   Comment card 'AaCard' by shortcut.
# export FULLURL="${URL}${CDS}/Fj4nK3on/actions/comments?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X POST -d '{"text":"Yippee!"}' ${FULLURL})
# echo ${rslt} | python -m json.tool

# # # #   Alter card comment 'AaCard' by shortcut.
# export FULLURL="${URL}${CDS}/Fj4nK3on/actions/559c02481b40ced88975eae4/comments?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X PUT -d '{"text":"Yippee Aiyay Kiyaa!"}' ${FULLURL})
# echo ${rslt} | python -m json.tool

# # # #   Get comments on card 'Aa' by shortcut.
# export FULLURL="${URL}${CDS}/Fj4nK3on/actions?${ACCESS}"
# export rslt=$(curl -H '${HEAD}' -X GET ${FULLURL})
# echo ${rslt} | python -m json.tool

# https://trello.com/1/authorize?key=dc7bb1d947ba9b50862042d0a71245c7&scope=read,write,account&name=SwaggerAPI&expiration=never&response_type=token


#                           - o 0 o -
#
## cd ~/projects/trello-swagger-generator
# dev/http_cors_server.py
#   . . . and . . .
# workon screen_scraper

# cd ~/projects/packages/meteor-swagger-client
# env NODE_OPTIONS='--debug' DEBUG=wm:msc:* meteor test-packages ../meteor-swagger-client
#   . . . and . . .
# node-inspector --web-port=8088
#


