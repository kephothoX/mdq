import { TopicMessageQuery } from "@hashgraph/sdk";

    alert('About to Jump!');


    document.onload(async () => {
      alert('Jump!');


      await new TopicMessageQuery()
            .setTopicId(window.localStorage.getItem('topicID'))
            .setStartTime(0)
            .subscribe(
                client,
                null,
                (message) => alert(Buffer.from(`${message?.contents}`, "utf8").toString())
            );
    });
