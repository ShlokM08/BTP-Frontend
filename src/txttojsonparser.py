import json, pymongo
import random, string, os


def store_json(json_key, name="new_schema.json"):
    try:
        # "w" file mode will create a new file if it does not exist
        file = open("json output/" + name, "w", encoding='utf-8')
        file.write(json.dumps(json_key, ensure_ascii=False, indent=4))
        file.close()
    except:
        print(f"Error in storing {name} JSON file.")
        exit(1)


def push_to_mongo(json_key):
    try:
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        mydb = myclient["Test"]
        mycol = mydb["data"]

        # Searching for document with group name 'grp'
        myquery = {"group_name": json_key["group_name"]}
        mydoc = mycol.find(myquery)
        # If document with group name 'grp' exists, then update it
        if mydoc.count() > 0: # type: ignore
            mycol.update_one(myquery, {"$set": json_key})
            print("Successfully updated MongoDB.")
            return
        # Else insert a new document
        mycol.insert_one(json_key)

        print("Successfully pushed to MongoDB.")
    except:
        print("Error in pushing to MongoDB. (Make sure MongoDB is running)")
        exit(1)


class User:
    def get_user_id(self):
        try:
            # _id: will be a random string of length 24
            # generating a random string of length 24 and storing it in id variable
            id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 24))
            return id
        except:
            print("Error in generating id (get_user_id() function).")
            exit(1)


def fill_details(path, user_messages, user_schema):
    try:
        pass
    except:
        print("Error in filling details (fill_details() function).")
        exit(1)


def update_user_structure(path, user_messages, user_schema):
    try:
        # For each user, there will be a seperate schema;
        schema_list = []
        user_messages.sort(key=lambda x: x["sender"])
        pass
        return schema_list
    except:
        print("Error in updating user structure (update_user_structure() function).")
        exit(1)


class Group:
    def get_group_id(self):
        try:
            # _id: will be a random string of length 48
            # generating a random string of length 48 and storing it in id variable
            id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 48))
            return id
        except:
            print("Error in generating id (get_group_id() function).")
            exit(1)


    def get_start_date(self, lines):
        try:
            start_date = ''
            for i in range(len(lines)):
                if 'created group' in lines[i]["message"]:
                    start_date = lines[i]["timestamp"].split(',')[0]
            return start_date
        except:
            print("Error in getting start date (get_start_date() function).")
            exit(1)


    def get_end_date(self, lines):
        try:
            # TODO: Add the expected end date of a group according to the information provided beforehand by experts
            return 'NA'
        except:
            print("Error in getting end date (get_end_date() function).")
            exit(1)


    def get_group_name(self, file_name):
        try:
            # Case 1: You created group "Test"
            # Case 2: You changed the group name from "Test" to "Test Group"
            # To get the updated path we can directly access it from the file name derived from path
            name = file_name.split('WhatsApp Chat with ')[1].split('.txt')[0]
            return name
        except:
            print("Error in getting group name (get_group_name() function).")
            exit(1)


    def get_group_admins(self, lines):
        try:
            admins = {}
            # Admins information not present in any system generated messages
            for line in lines:
                message = line["message"]
                if "added" in message:
                    name = message.split(' added ')[0].strip()
                    if 'You' in name:
                        admins['You'] = True
                    else:
                        admins[name] = True
                elif "removed" in message:
                    name = message.split(' removed ')[0].strip()
                    if 'You' in name:
                        admins['You'] = True
                    else:
                        admins[name] = True
            return admins
        except:
            print("Error in getting group admins.")
            exit(1)


    def get_group_members(self, lines):
        try:
            # Case 1 Removed by admin - 'You removed Ishit (CSAM)'
            # Case 2 Removed herself/himself - 'Ishit (CSAM) left'
            # Case 3 Added by admin - 'You added Ishit (CSAM)'
            # Case 4 Initially the group was created with these members - No system generated messages
            # Case 5 Neha Singh added Sid, Kal, Tuk and Roe
            members = {}
            # Assumption: name does not contain 'removed', 'left', or 'added' in it
            # Assumption: admin names will also be there in group members
            for line in lines:
                message = line["message"]

                if "removed" in message:
                    name = message.split(' removed ')[1].strip()
                    if ',' in name:         # multiple names > 2
                        names = name.split(', ')
                        for n in names:
                            if 'and' not in n:
                                if 'You' not in n.capitalize():
                                    members[n] = False
                            else:
                                n = n.split(' and ')
                                if 'You' not in n[0].capitalize():
                                    members[n[0]] = False
                                if 'You' not in n[1].capitalize():
                                    members[n[1]] = False
                    elif 'and' in name:     # multiple names = 2
                        n = name.split(' and ')
                        if 'You' not in n[0].capitalize():
                            members[n[0]] = False
                        if 'You' not in n[1].capitalize():
                            members[n[1]] = False
                    else:                   # single name = 1
                        if 'You' not in name:
                            members[name] = False

                elif "added" in message:
                    name = message.split(' added ')[1].strip()
                    if ',' in name:
                        names = name.split(', ')
                        for n in names:
                            if 'and' not in n:
                                if 'You' not in n.capitalize():
                                    members[n] = True
                            else:
                                n = n.split(' and ')

                                members[n[0]] = True
                                members[n[1]] = True
                    elif 'and' in name:
                        n = name.split(' and ')
                        members[n[0]] = True
                        members[n[1]] = True
                    else:
                        if 'You' not in name.capitalize():
                            members[name] = True
                
                elif "left" in message:
                    name = message.split(' left')[0].strip()
                    if 'You' not in name.capitalize():
                        members[name] = False

            return members
        except:
            print("Error in getting members.")
            exit(1)


    def get_group_data(self, lines):
        try:
            data = {}
            for line in lines:
                date = line["timestamp"].split(',')[0]
                if date not in data:
                    data[date] = []
                data[date].append(line)
            return data
        except:
            print("Error in getting group messsages.")
            exit(1)

    def check_valid_user(self, name):
        if name[0] == 'M' and name[1:].isdigit():
            return True
        return False
    def update_group_structure(self, file_name, system_messages, updated_lines, user_info):
        try:
            json_key = {}
            json_key["_id"] = self.get_group_id()
            json_key["group_name"] = self.get_group_name(file_name)
            json_key["group_admins"] = self.get_group_admins(system_messages)
            json_key['members'] = self.get_group_members(system_messages)
            json_key["start_date"] = self.get_start_date(system_messages)
            json_key["end_date"] = self.get_end_date(system_messages)
            json_key["content"] = self.get_group_data(updated_lines)
            print("-------------------")
            print(user_info)
            
            json_key['unknown_user_count'], json_key["known_users"], json_key["unknown_users"] = user_info[0], user_info[1], user_info[2]

            for i in json_key['members']:
                print(i)
                if not self.check_valid_user(i):
                    json_key['unknown_user_count'] += 1
                    json_key["unknown_users"].append(i)
                else:
                    json_key["known_users"].append(i)


            # {member_ids : [phone_number1, phone_number2, ...]}  

            #  if member_id is given by moderator : {M1 : [phonenumber1,...]} phone number has to be manually added by moderator 
            #  if member_id not given             
                # 1. phone number or String name
                            # saved as N_i
                                # person already in group -> add number/name to list and delete N_i
                                # person not in group -> add to member_ids, add to memebr_mapping

            # json_key["known_member_mappings"] = {} # {M_i/N_i : [phone_number1|String|id]}
            # json_key["unknown_member_mapping"] = {} # [string name/phone number] : N_i

            # for i in json_key['members']:
            #     print(i)
            #     if i[0] == 'M' and i[1:].isdigit(): # satisfies convention add them to member_ids list
            #         json_key["known_member_mappings"][i] = [i]
            #     else: # doesnot satisfies convention
            #         id = 'N' + str(len(json_key["unknown_member_mapping"])+1)
            #         json_key["unknown_member_mapping"][i] = 'N' + id
            #         json_key["known_member_mappings"][id] = [i] 

            #     # else: # doesnot satisfies convention
            #     #     id = 'N' + str(len(json_key["member_mapping"])+1)
            #     #     json_key["member_mapping"][i] = 'N' + id



            return json_key
        except:
            print("Error in updating group structure (update_group_structure() function).")
            exit(1)


class Message:
    def get_timestamp(self, line):
        try:
            # Sample: '11/7/23, 9:07 AM - Sufyan: ismei saare settings change krke like admins add/remove/change etc dekhengey'
            # change the space between time and AM to a space
            timestamp = line[:line.index('-')-1].replace(' ', ' ')
            return timestamp
        except:
            print("Error in getting date and time (get_timestamp() function).")
            exit(1)


    def get_user(self, line):
        try:
            # Sample: '11/7/23, 9:07 AM - Sufyan: ismei saare settings change krke like admins add/remove/change etc dekhengey'
            # Sample2: '11/7/23, 9:05 AM - You created group "Test"'
            # Observation: no system generated message will have a ':' in it. Thus no user will be present in it to check for which is good.
            temp = line[line.index('-')+2 :]
            if ':' not in temp:
                user = 'System'
            else:
                user = temp[:temp.index(':')]
            return user
        except:
            print("Error in getting user.")
            exit(1)


    def get_message(self, line, user):
        try:
            # Sample: '11/7/23, 9:07 AM - Sufyan: ismei saare settings change krke like admins add/remove/change etc dekhengey'
            # Sample2: '11/7/23, 9:05 AM - You created group "Test"'
            if user == 'System':
                message = line[line.index('-')+2 :]
            else:
                message = line[line.index(user)+len(user)+2 :]
            return message
        except:
            print("Error in getting message.")
            exit(1)


    def get_tag(self, message, user):
        try:
            tag = []
            if user == 'System':
                tag.append(user)
            else:
                tag.append('User')
                # TODO: Add more tags by performing NLP on messages
            return tag
        except:
            print("Error in getting tag.")
            exit(1)


    def get_message_id(self, file_name, timestamp, grp, prev_id=''):
        try:
            # mesage_id will be group name_timestamp_counter. Counter will be incremented for every message that has the same timestamp.
            message_id = grp.get_group_name(file_name) + '_' + timestamp + '_'
            if prev_id == '':
                message_id += '0'
            else:
                # compare if the current message has the same timestamp as the previous message
                if prev_id.split('_')[1] == timestamp:
                    message_id += str(int(prev_id.split('_')[2]) + 1)
                else:
                    message_id += '0'
            return message_id
        except:
            print("Error in getting message id.")
            exit(1)


    def get_user_and_system_messages(self, dic): # dic is a list of dictionaries
        try:
            system_messages = []
            user_messages = []
            for i in range(len(dic)):
                if dic[i]["sender"] == "System":
                    system_messages.append(dic[i])
                else:
                    user_messages.append(dic[i])
            return system_messages, user_messages
        except:
            print("Error in bifurcating user and system messages.")
            exit(1)


def update_message_structure(lines, file_name, msg, grp):
    try:
        updated_lines = []

        for i in range(len(lines)):
            temp = lines[i].strip()
            if temp == '':
                continue

            # check if it contains a timestamp, if not then it is a continuation of the previous message
            check = temp.split('/')[0]
            if not check.isdigit():
                updated_lines[-1]["message"] += ' ' + temp
                continue

            timestamp = msg.get_timestamp(temp)
            user = msg.get_user(temp)
            message = msg.get_message(temp, user)
            tag = msg.get_tag(message, user)
            id = msg.get_message_id(file_name, timestamp, grp, updated_lines[-1]["message_id"] if len(updated_lines) > 0 else '')

            updated_lines.append({"message_id": id, "timestamp": timestamp, "sender": user, "message": message, "tag": tag})
            # print(updated_lines[-1])
        return updated_lines
    except:
        print("Error in updating message structure.")
        exit(1)


def mainJSONParser(content, file_name, user_info, store=True):
    try:
        message = Message()
        group_schema = Group()
        user_schema = User()

        updated_lines = update_message_structure(content, file_name, message, group_schema)
        # if store:
        #     store_json(updated_lines, "message_structure_2.json")
        system_messages, user_messages = message.get_user_and_system_messages(updated_lines) # type: ignore

        group_json = group_schema.update_group_structure(file_name, system_messages, updated_lines,user_info)
        if store:
            # print(group_json)
            return group_json
        
        
        # user_json = update_user_structure(path, user_messages, user_schema)
        # print(user_json)
        # if store:
        #     store_json(user_json, "user wise schema.json")
        
        # push_to_mongo(group_json)
    except:
        print("Error in converting the data to json (main() function).")
        exit(1)


def mainJSON(path, store=True):
    try:
        file = open(path, encoding="utf8")
        lines = file.readlines()
        file.close()
        
        message = Message()
        group_schema = Group()
        user_schema = User()

        updated_lines = update_message_structure(lines, path, message, group_schema)
        if store:
            store_json(updated_lines, "message_structure_3.json")
        system_messages, user_messages = message.get_user_and_system_messages(updated_lines)

        group_json = group_schema.update_group_structure(path, system_messages, updated_lines)
        if store:
            store_json(group_json, "group wise schema_3.json")

        # user_json = update_user_structure(path, user_messages, user_schema)
        # print(user_json)
        # if store:
        #     store_json(user_json, "user wise schema.json")
        
        # push_to_mongo(group_json)
    except:
        print("Error in converting the data to json (main() function).")
        exit(1)


def check_all_files():
    dir = "Whatsapp Chats"
    files = os.listdir(dir)
    for file in files:
        path = "Whatsapp Chats/" + file
        mainJSON(path)
    
    return True


if __name__ == "__main__":
    try:
        path = "Whatsapp Chats\WhatsApp Chat with (SUPPORT PREGNANACY) 4.txt"
        # path = "Whatsapp Chats\WhatsApp Chat with Test Group.txt"
        mainJSON(path, store=True)
        # check_all_files()
    except:
        print("Error in calling main() function.")
        exit(1)



'''
Sample JSON Output for user wise schema -

    {
        "_id": "6QJXKJXKJXKJXKJXKJXKJXKJ",
        "name": "Sid",
        "affiliated_groups": [
            {"group_name": "AI Monsoon 22-23", "start_date": "9/7/22", "end_date": "9/7/22"},
            {"group_name": "CN Monsoon 22-23", "start_date": "9/7/22", "end_date": "9/7/22"}
        ],
        "content": {
            "group1": [message1, message2, ...],
            "group2": [message1, message2, ...]
        }
    }
        
'''



'''
Sample JSON Output for group wise schema - 
    
    {
        "group_name": "AI Monsoon 22-23",
        "group_admins": [
            "Siddharth",
            "Anshul"
        ],
        "members": {
            "Sid": True,
            "Anshul": True,
            "Siddharth": False
        },
        "start_date": "9/7/22",
        "end_date": "9/7/22",
        "content": {
            "9/7/22": [
                {
                    "date": "9/7/22 7:57",
                    "user": "System",
                    "message": "+91 98187 58133 joined using this group's invite link"
                },
                {
                    "date": "9/7/22 7:57",
                    "user": "System",
                    "message": "+91 98187 58133 joined using this group's invite link"
                }
            ]
        }
    }
'''
