import stanza

model = stanza.Pipeline('sv', model_dir="/mnt/C/d/stanza_resources/")

def process(text):
    res = []
    parse = model(text)
    sents = parse.sentences
    max_sent_id = len(sents) - 1
    for i,sentence in enumerate(sents):
        for token in sentence.words:
            nobj = {}
            nobj["sent_id"] = i
            nobj["max_sent_id"] = max_sent_id
            nobj["text"] = token.text
            nobj["lemma"] = token.lemma
            nobj["pos"] = token.pos
            res.append(nobj)
    return res

def process2(json_obj, exclude_first, exclude_last, everyx):
    res = {"targets": [], "targets_lemma": [], "tokens": [], "title": None}
    distance_to_prev_gap = -1
    every = everyx
    tpos = "NOUN"
    for i,line in enumerate(json_obj):
        
        nobj = dict()
        nobj["word"] = line["text"]
        nobj["pos"] = line["pos"]
        nobj["lemma"] = line["lemma"]
        
        target = line["text"].lower()
        target_lemma = line["lemma"].lower()
        if line["pos"] == "LINEBREAK":
            res["tokens"].append(nobj)
            continue
        if exclude_first and line["sent_id"] and line["sent_id"] == 0:
            res["tokens"].append(nobj)
            continue
        if exclude_last and line["sent_id"] and line["sent_id"] == line["max_sent_id"]:
            res["tokens"].append(nobj)
            continue
        if line["pos"] == tpos:
            if target not in res["targets"]:
                res["targets"].append(target)
            if target_lemma not in res["targets_lemma"]:
                res["targets_lemma"].append(target_lemma)
            if "exclude" in line and line["exclude"] == "true":
                continue
            if distance_to_prev_gap == -1:
                distance_to_prev_gap += 1
                nobj["gap"] = True
                accepted = None
                try:
                    accepted = [ps[0]]
                    accepted.extend(ps[3].split(","))
                except:
                    accepted = [target]
                nobj["accept"] = accepted
            if distance_to_prev_gap > -1 and distance_to_prev_gap >= every:
                distance_to_prev_gap = 0
                nobj["gap"] = True
                accepted = None
                try:
                    accepted = [ps[0]]
                    accepted.extend(ps[3].split(","))
                except:
                    accepted = [target]
                nobj["accept"] = accepted
        distance_to_prev_gap += 1
        res["tokens"].append(nobj)
    return res