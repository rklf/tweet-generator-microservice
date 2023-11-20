document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addAttachment").addEventListener("click", function (e) {
    e.preventDefault();
    const container = document.getElementById("attachmentsContainer");
    const attachmentCount = container.children.length;

    if (attachmentCount < 4) {
      const attachmentDiv = document.createElement("div");
      attachmentDiv.className = "input-group mb-2";

      const attachmentType = document.createElement("select");
      attachmentType.className = "form-select attachment-type";
      attachmentType.setAttribute("required", "");
      attachmentType.innerHTML = `
        <option value="image">Image</option>
        <option value="gif">GIF</option>
        <option value="video">Video</option>
      `;

      const attachmentUrl = document.createElement("input");
      attachmentUrl.className = "form-control attachment-url";
      attachmentUrl.setAttribute("type", "text");
      attachmentUrl.setAttribute("placeholder", "URL");
      attachmentUrl.setAttribute("required", "");

      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-outline-danger remove-attachment";
      removeButton.setAttribute("type", "button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function (e) {
        e.preventDefault();
        attachmentDiv.remove();
      });

      attachmentDiv.appendChild(attachmentType);
      attachmentDiv.appendChild(attachmentUrl);
      attachmentDiv.appendChild(removeButton);
      container.appendChild(attachmentDiv);
    }
  });

  document.getElementById("addQuoted").addEventListener("click", function (e) {
    e.preventDefault();
    const container = document.getElementById("quotedContainer");
    const quotedDiv = document.createElement("div");
    quotedDiv.className = "mb-3";

    const quotedName = document.createElement("div");
    quotedName.innerHTML = `
      <label for="quotedName">Name</label>
      <input type="text" class="form-control" id="quotedName" required>
    `;

    const quotedUsername = document.createElement("div");
    quotedUsername.innerHTML = `
      <label for="quotedUsername">Username</label>
      <input type="text" class="form-control" id="quotedUsername" required>
    `;

    const quotedText = document.createElement("div");
    quotedText.innerHTML = `
      <label for="quotedText">Tweet Text</label>
      <textarea class="form-control" id="quotedText" rows="4" required></textarea>
    `;

    const quotedVerifiedType = document.createElement("div");
    quotedVerifiedType.innerHTML = `
      <label for="quotedVerifiedType">Verified Type</label>
      <select class="form-select" id="quotedVerifiedType">
        <option value="none">None</option>
        <option value="blue">Blue</option>
        <option value="business">Business</option>
        <option value="government">Government</option>
      </select>
    `;

    const quotedDate = document.createElement("div");
    quotedDate.innerHTML = `
      <label for="quotedDate">Date</label>
      <input type="date" class="form-control" id="quotedDate">
    `;

    const quotedAttachmentsRoot = document.createElement("div");
    quotedAttachmentsRoot.className = "mb-3";
    const quotedAttachmentsContainer = document.createElement("div");
    quotedAttachmentsContainer.id = "quotedAttachmentsContainer";
    const quotedAttachmentsLabel = document.createElement("label");
    quotedAttachmentsLabel.setAttribute("for", "quotedAttachments");
    quotedAttachmentsLabel.className = "form-label";
    quotedAttachmentsLabel.textContent = "Attachments (Up to 4)";

    const quotedAttachments = document.createElement("div");
    quotedAttachments.className = "input-group mb-2";
    const quotedAttachmentType = document.createElement("select");
    quotedAttachmentType.className = "form-select attachment-type";
    quotedAttachmentType.setAttribute("required", "");
    quotedAttachmentType.innerHTML = `
      <option value="image">Image</option>
      <option value="gif">GIF</option>
      <option value="video">Video</option>
    `;
    const quotedAttachmentUrl = document.createElement("input");
    quotedAttachmentUrl.className = "form-control attachment-url";
    quotedAttachmentUrl.setAttribute("type", "text");
    quotedAttachmentUrl.setAttribute("placeholder", "URL");
    const quotedRemoveButton = document.createElement("button");
    quotedRemoveButton.className = "btn btn-outline-danger remove-attachment";
    quotedRemoveButton.setAttribute("type", "button");
    quotedRemoveButton.textContent = "Remove";
    quotedRemoveButton.addEventListener("click", function (e) {
      e.preventDefault();
      quotedAttachments.remove();
    });
    quotedAttachments.appendChild(quotedAttachmentType);
    quotedAttachments.appendChild(quotedAttachmentUrl);
    quotedAttachments.appendChild(quotedRemoveButton);
    const quotedAddAttachment = document.createElement("button");
    quotedAddAttachment.className = "btn btn-outline-primary";
    quotedAddAttachment.id = "addQuotedAttachment";
    quotedAddAttachment.setAttribute("type", "button");
    quotedAddAttachment.textContent = "Add Attachment";
    quotedAttachmentsRoot.appendChild(quotedAttachmentsLabel);
    quotedAttachmentsContainer.appendChild(quotedAttachments);
    quotedAttachmentsRoot.appendChild(quotedAttachmentsContainer);
    quotedAttachmentsRoot.appendChild(quotedAddAttachment);
    quotedAddAttachment.addEventListener("click", function (e) {
      e.preventDefault();
      const container = document.getElementById("quotedAttachmentsContainer");
      const attachmentCount = container.children.length;

      if (attachmentCount < 4) {
        const attachmentDiv = document.createElement("div");
        attachmentDiv.className = "input-group mb-2";

        const attachmentType = document.createElement("select");
        attachmentType.className = "form-select attachment-type";
        attachmentType.setAttribute("required", "");
        attachmentType.innerHTML = `
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Video</option>
        `;

        const attachmentUrl = document.createElement("input");
        attachmentUrl.className = "form-control attachment-url";
        attachmentUrl.setAttribute("type", "text");
        attachmentUrl.setAttribute("placeholder", "URL");

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-outline-danger remove-attachment";
        removeButton.setAttribute("type", "button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function (e) {
          e.preventDefault();
          attachmentDiv.remove();
        });

        attachmentDiv.appendChild(attachmentType);
        attachmentDiv.appendChild(attachmentUrl);
        attachmentDiv.appendChild(removeButton);
        container.appendChild(attachmentDiv);
      }
    });

    const quotedRetweetCount = document.createElement("div");
    quotedRetweetCount.innerHTML = `
      <label for="quotedRetweetCount">Retweet Count</label>
      <input type="number" class="form-control" id="quotedRetweetCount" value="0">
    `;

    const quotedQuoteCount = document.createElement("div");
    quotedQuoteCount.innerHTML = `
      <label for="quotedQuoteCount">Quote Count</label>
      <input type="number" class="form-control" id="quotedQuoteCount" value="0">
    `;

    const quotedLikeCount = document.createElement("div");
    quotedLikeCount.innerHTML = `
      <label for="quotedLikeCount">Like Count</label>
      <input type="number" class="form-control" id="quotedLikeCount" value="0">
    `;

    const quotedReplyCount = document.createElement("div");
    quotedReplyCount.innerHTML = `
      <label for="quotedReplyCount">Reply Count</label>
      <input type="number" class="form-control" id="quotedReplyCount" value="0">
    `;

    const quotedImpressionCount = document.createElement("div");
    quotedImpressionCount.innerHTML = `
      <label for="quotedImpressionCount">Impression Count</label>
      <input type="number" class="form-control" id="quotedImpressionCount" value="0">
    `;

    const quotedProfilePicture = document.createElement("div");
    quotedProfilePicture.innerHTML = `
      <label for="quotedProfilePicture">Profile Picture</label>
      <input type="text" class="form-control" id="quotedProfilePicture" placeholder="URL" value="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png">
    `;

    quotedDiv.appendChild(quotedName);
    quotedDiv.appendChild(quotedUsername);
    quotedDiv.appendChild(quotedText);
    quotedDiv.appendChild(quotedVerifiedType);
    quotedDiv.appendChild(quotedDate);
    quotedDiv.appendChild(quotedRetweetCount);
    quotedDiv.appendChild(quotedQuoteCount);
    quotedDiv.appendChild(quotedLikeCount);
    quotedDiv.appendChild(quotedReplyCount);
    quotedDiv.appendChild(quotedImpressionCount);
    quotedDiv.appendChild(quotedAttachmentsRoot);
    quotedDiv.appendChild(quotedProfilePicture);
    container.appendChild(quotedDiv);

    document.getElementById("addQuoted").remove();
  });


  document.getElementById("addReplied").addEventListener("click", function (e) {
    e.preventDefault();
    const container = document.getElementById("repliedContainer");
    const repliedDiv = document.createElement("div");
    repliedDiv.className = "mb-3";

    const repliedName = document.createElement("div");
    repliedName.innerHTML = `
      <label for="repliedName">Name</label>
      <input type="text" class="form-control" id="repliedName" placeholder="Name">
    `;

    const repliedUsername = document.createElement("div");
    repliedUsername.innerHTML = `
      <label for="repliedUsername">Username</label>
      <input type="text" class="form-control" id="repliedUsername" placeholder="Username">
    `;

    const repliedText = document.createElement("div");
    repliedText.innerHTML = `
      <label for="repliedText">Text</label>
      <textarea class="form-control" id="repliedText" rows="3" placeholder="Text"></textarea>
    `;

    const repliedVerifiedType = document.createElement("div");
    repliedVerifiedType.innerHTML = `
      <label for="repliedVerifiedType">Verified Type</label>
      <select class="form-select" id="repliedVerifiedType">
        <option value="none">None</option>
        <option value="blue">Blue</option>
        <option value="business">Business</option>
        <option value="government">Government</option>
      </select>
    `;

    const repliedAttachmentsRoot = document.createElement("div");
    repliedAttachmentsRoot.className = "mb-3";
    const repliedAttachmentsContainer = document.createElement("div");
    repliedAttachmentsContainer.id = "repliedAttachmentsContainer";
    const repliedAttachmentsLabel = document.createElement("label");
    repliedAttachmentsLabel.setAttribute("for", "repliedAttachments");
    repliedAttachmentsLabel.className = "form-label";
    repliedAttachmentsLabel.textContent = "Attachments (Up to 4)";

    const repliedAttachments = document.createElement("div");
    repliedAttachments.className = "input-group mb-2";
    const repliedAttachmentsType = document.createElement("select");
    repliedAttachmentsType.className = "form-select attachment-type";
    repliedAttachmentsType.setAttribute("required", "");
    repliedAttachmentsType.innerHTML = `
      <option value="image">Image</option>
      <option value="gif">GIF</option>
      <option value="video">Video</option>
    `;
    const repliedAttachmentsUrl = document.createElement("input");
    repliedAttachmentsUrl.className = "form-control attachment-url";
    repliedAttachmentsUrl.setAttribute("type", "text");
    repliedAttachmentsUrl.setAttribute("placeholder", "URL");
    const repliedAttachmentsRemoveButton = document.createElement("button");
    repliedAttachmentsRemoveButton.className = "btn btn-outline-secondary remove-attachment";
    repliedAttachmentsRemoveButton.setAttribute("type", "button");
    repliedAttachmentsRemoveButton.textContent = "Remove";
    repliedAttachmentsRemoveButton.addEventListener("click", function (e) {
      e.preventDefault();
      const attachmentCount = container.children.length;
      if (attachmentCount === 1) return;
      e.target.parentElement.remove();
    });
    repliedAttachments.appendChild(repliedAttachmentsType);
    repliedAttachments.appendChild(repliedAttachmentsUrl);
    repliedAttachments.appendChild(repliedAttachmentsRemoveButton);
    const repliedAttachmentsAddButton = document.createElement("button");
    repliedAttachmentsAddButton.className = "btn btn-outline-secondary";
    repliedAttachmentsAddButton.id = "repliedAttachmentsAddButton";
    repliedAttachmentsAddButton.setAttribute("type", "button");
    repliedAttachmentsAddButton.textContent = "Add Attachment";
    repliedAttachmentsRoot.appendChild(repliedAttachmentsLabel);
    repliedAttachmentsContainer.appendChild(repliedAttachments);
    repliedAttachmentsRoot.appendChild(repliedAttachmentsContainer);
    repliedAttachmentsRoot.appendChild(repliedAttachmentsAddButton);
    repliedAttachmentsAddButton.addEventListener("click", function (e) {
      e.preventDefault();
      const container = document.getElementById("repliedAttachmentsContainer");
      const attachmentCount = container.children.length;

      if (attachmentCount < 4) {
        const attachmentDiv = document.createElement("div");
        attachmentDiv.className = "input-group mb-2";

        const attachmentType = document.createElement("select");
        attachmentType.className = "form-select attachment-type";
        attachmentType.setAttribute("required", "");
        attachmentType.innerHTML = `
          <option value="image">Image</option>
          <option value="gif">GIF</option>
          <option value="video">Video</option>
        `;

        const attachmentUrl = document.createElement("input");
        attachmentUrl.className = "form-control attachment-url";
        attachmentUrl.setAttribute("type", "text");
        attachmentUrl.setAttribute("placeholder", "URL");

        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-outline-danger remove-attachment";
        removeButton.setAttribute("type", "button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function (e) {
          e.preventDefault();
          attachmentDiv.remove();
        });

        attachmentDiv.appendChild(attachmentType);
        attachmentDiv.appendChild(attachmentUrl);
        attachmentDiv.appendChild(removeButton);
        container.appendChild(attachmentDiv);
      }
    });

    const repliedDate = document.createElement("div");
    repliedDate.innerHTML = `
      <label for="repliedDate">Date</label>
      <input type="datetime-local" class="form-control" id="repliedDate">
    `;

    const repliedRetweetCount = document.createElement("div");
    repliedRetweetCount.innerHTML = `
      <label for="repliedRetweetCount">Retweet Count</label>
      <input type="number" class="form-control" id="repliedRetweetCount" value="0">
    `;

    const repliedQuoteCount = document.createElement("div");
    repliedQuoteCount.innerHTML = `
      <label for="repliedQuoteCount">Quote Count</label>
      <input type="number" class="form-control" id="repliedQuoteCount" value="0">
    `;

    const repliedLikeCount = document.createElement("div");
    repliedLikeCount.innerHTML = `
      <label for="repliedLikeCount">Like Count</label>
      <input type="number" class="form-control" id="repliedLikeCount" value="0">
    `;

    const repliedReplyCount = document.createElement("div");
    repliedReplyCount.innerHTML = `
      <label for="repliedReplyCount">Reply Count</label>
      <input type="number" class="form-control" id="repliedReplyCount" value="0">
    `;

    const repliedImpressionCount = document.createElement("div");
    repliedImpressionCount.innerHTML = `
      <label for="repliedImpressionCount">Impression Count</label>
      <input type="number" class="form-control" id="repliedImpressionCount" value="0">
    `;

    const repliedProfilePicture = document.createElement("div");
    repliedProfilePicture.innerHTML = `
      <label for="repliedProfilePicture">Profile Picture</label>
      <input type="text" class="form-control" id="repliedProfilePicture" placeholder="URL" value="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png">
    `;

    repliedDiv.appendChild(repliedName);
    repliedDiv.appendChild(repliedUsername);
    repliedDiv.appendChild(repliedText);
    repliedDiv.appendChild(repliedVerifiedType);
    repliedDiv.appendChild(repliedDate);
    repliedDiv.appendChild(repliedRetweetCount);
    repliedDiv.appendChild(repliedQuoteCount);
    repliedDiv.appendChild(repliedLikeCount);
    repliedDiv.appendChild(repliedReplyCount);
    repliedDiv.appendChild(repliedImpressionCount);
    repliedDiv.appendChild(repliedAttachmentsRoot);
    repliedDiv.appendChild(repliedProfilePicture);
    container.appendChild(repliedDiv);

    document.getElementById("addReplied").remove();
  });

  document.getElementById("tweetForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const text = document.getElementById("text").value;
    const verifiedType = document.getElementById("verifiedType").value;
    const date = document.getElementById("date").value;
    const retweetCount = document.getElementById("retweetCount").value;
    const quoteCount = document.getElementById("quoteCount").value;
    const likeCount = document.getElementById("likeCount").value;
    const replyCount = document.getElementById("replyCount").value;
    const impressionCount = document.getElementById("impressionCount").value;
    const profileImage = document.getElementById("profileImage").value;

    const attachments = [];
    const attachmentDivs = document.getElementById("attachmentsContainer").getElementsByClassName("input-group mb-2");
    for (let i = 0; i < attachmentDivs.length; i++) {
      if (attachmentDivs[i].getElementsByClassName("attachment-url")[0].value === "") {
        continue;
      }
      const attachmentType = attachmentDivs[i].getElementsByClassName("attachment-type")[0].value;
      const attachmentUrl = attachmentDivs[i].getElementsByClassName("attachment-url")[0].value;
      attachments.push({
        type: attachmentType,
        url: attachmentUrl
      });
    }

    const quoted = getQuotedTweetData();
    const repliedTo = getRepliedTweetsData();

    const tweetData = {
      name,
      username,
      text,
      verifiedType,
      date,
      retweetCount,
      quoteCount,
      likeCount,
      replyCount,
      impressionCount,
      attachments,
      profileImage,
      quoted,
      repliedTo
    };

    const tweetDataJson = JSON.stringify(tweetData);
    const encodedTweetDataJson = encodeURIComponent(tweetDataJson);
    const apiUrl = `http://localhost:3003/tweet?tweetData=${encodedTweetDataJson}`;
    const apiScreenUrl = `http://localhost:3003/screenshot?tweetData=${encodedTweetDataJson}`;
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = `<img src="${apiScreenUrl}" alt="Tweet Preview" class="img-fluid">`;
    const tweetButton = document.createElement("a");
    tweetButton.className = "btn btn-primary mt-3";
    tweetButton.href = apiUrl;
    tweetButton.target = "_blank";
    tweetButton.textContent = "Open Tweet";
    previewContainer.appendChild(tweetButton);
  });

  function getQuotedTweetData() {
    // If there is no quoted tweet, return null
    if (!document.getElementById("quotedName") || !document.getElementById("quotedUsername") || !document.getElementById("quotedText") || !document.getElementById("quotedVerifiedType") || !document.getElementById("quotedDate") || !document.getElementById("quotedRetweetCount") || !document.getElementById("quotedQuoteCount") || !document.getElementById("quotedLikeCount") || !document.getElementById("quotedReplyCount") || !document.getElementById("quotedImpressionCount")) {
      return null;
    }
    const quotedName = document.getElementById("quotedName").value;
    const quotedUsername = document.getElementById("quotedUsername").value;
    const quotedText = document.getElementById("quotedText").value;
    const quotedVerifiedType = document.getElementById("quotedVerifiedType").value;
    const quotedDate = document.getElementById("quotedDate").value;
    const quotedRetweetCount = document.getElementById("quotedRetweetCount").value;
    const quotedQuoteCount = document.getElementById("quotedQuoteCount").value;
    const quotedLikeCount = document.getElementById("quotedLikeCount").value;
    const quotedReplyCount = document.getElementById("quotedReplyCount").value;
    const quotedImpressionCount = document.getElementById("quotedImpressionCount").value;
    const quotedProfilePicture = document.getElementById("quotedProfilePicture").value;

    const quotedAttachments = [];
    const quotedAttachmentDivs = document.getElementById("quotedAttachmentsContainer").getElementsByClassName("input-group mb-2");
    for (let i = 0; i < quotedAttachmentDivs.length; i++) {
      if (quotedAttachmentDivs[i].getElementsByClassName("attachment-url")[0].value === "") {
        continue;
      }
      const attachmentType = quotedAttachmentDivs[i].getElementsByClassName("attachment-type")[0].value;
      const attachmentUrl = quotedAttachmentDivs[i].getElementsByClassName("attachment-url")[0].value;
      quotedAttachments.push({
        type: attachmentType,
        url: attachmentUrl
      });
    }

    const quotedTweetData = {
      name: quotedName,
      username: quotedUsername,
      text: quotedText,
      verifiedType: quotedVerifiedType,
      date: quotedDate,
      retweetCount: quotedRetweetCount,
      quoteCount: quotedQuoteCount,
      likeCount: quotedLikeCount,
      replyCount: quotedReplyCount,
      impressionCount: quotedImpressionCount,
      attachments: quotedAttachments,
      profileImage: quotedProfilePicture
    };

    return quotedTweetData;
  }

  function getRepliedTweetsData() {
    const repliedTweets = [];
    const repliedDivs = document.getElementById("repliedContainer");
    for (let i = 0; i < repliedDivs.children.length; i++) {
      const repliedName = document.getElementById("repliedName").value;
      const repliedUsername = document.getElementById("repliedUsername").value;
      const repliedText = document.getElementById("repliedText").value;
      const repliedVerifiedType = document.getElementById("repliedVerifiedType").value;
      const repliedDate = document.getElementById("repliedDate").value;
      const repliedRetweetCount = document.getElementById("repliedRetweetCount").value;
      const repliedQuoteCount = document.getElementById("repliedQuoteCount").value;
      const repliedLikeCount = document.getElementById("repliedLikeCount").value;
      const repliedReplyCount = document.getElementById("repliedReplyCount").value;
      const repliedImpressionCount = document.getElementById("repliedImpressionCount").value;
      const repliedProfilePicture = document.getElementById("repliedProfilePicture").value;

      const repliedAttachments = [];
      const repliedAttachmentDivs = document.getElementById("repliedAttachmentsContainer").getElementsByClassName("input-group mb-2");
      for (let i = 0; i < repliedAttachmentDivs.length; i++) {
        if (repliedAttachmentDivs[i].getElementsByClassName("attachment-url")[0].value === "") {
          continue;
        }
        const attachmentType = repliedAttachmentDivs[i].getElementsByClassName("attachment-type")[0].value;
        const attachmentUrl = repliedAttachmentDivs[i].getElementsByClassName("attachment-url")[0].value;
        repliedAttachments.push({
          type: attachmentType,
          url: attachmentUrl
        });
      }

      const repliedTweetData = {
        name: repliedName,
        username: repliedUsername,
        text: repliedText,
        verifiedType: repliedVerifiedType,
        date: repliedDate,
        retweetCount: repliedRetweetCount,
        quoteCount: repliedQuoteCount,
        likeCount: repliedLikeCount,
        replyCount: repliedReplyCount,
        impressionCount: repliedImpressionCount,
        attachments: repliedAttachments,
        profileImage: repliedProfilePicture,
      };

      repliedTweets.push(repliedTweetData);
    }

    console.log(repliedTweets);
    return repliedTweets;
  }
});