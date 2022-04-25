import json
import os


def getPathJSON(pathString, path):
    json_data = {}
    dirlist = os.listdir(pathString)
    for item in dirlist:
        if '.' not in item:
            json_data[item] = getPathJSON(pathString + '\\' + item, path+item+'/')
        else:
            file_name = item.split('.')[0] + "/"
            if file_name == "README/":
                file_name = ""
                continue
            with open(pathString + '\\' + item, encoding='utf-8') as f:
                topic = "no topic",
                for l in f.readlines():

                    if "#" in l:
                        topic = l.split('#')[-1].strip()
                        break
                json_data[path+file_name] = topic
    return json_data


curPath = os.path.abspath(os.path.dirname(__file__))
content_data = getPathJSON(curPath + '\\docs\\md', '/md/')
with open('content_data.json', 'w') as f:
    js = json.dumps(content_data)
    f.write(js)

