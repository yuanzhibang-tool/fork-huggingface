// ==UserScript==
// @name         HF Fork
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://huggingface.co/*
// @match        https://colab.research.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=huggingface.co
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        unsafeWindow
// @run-at       document-end

// ==/UserScript==

(function () {
    'use strict';
    var listenerKey = "fork_repo_cmd"
    function showToast(message) {
        var toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '10px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '9999';
        // Add the toast to the page
        document.body.appendChild(toast);
        // Remove the toast after 3 seconds
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 3000);
    }

    function addForkButton() {
        // Create a new button element
        var button = document.createElement('button');
        button.setAttribute('id', 'floating-button');
        button.innerHTML = 'Fork';

        // Add styles to the button element
        button.style.position = 'fixed';
        button.style.top = '50px';
        button.style.width = '50px';
        button.style.height = '50px';

        button.style.right = '20px';
        button.style.zIndex = '9999';
        button.style.background = 'white'
        button.style.borderRadius = '50%';
        button.style.border = '3px solid #3498db';

        button.addEventListener('click', function () {
            var urlPath = window.location.pathname
            var repoId = urlPath.substring(1)
            var repoType = 'model'
            if (window.location.pathname.startsWith("/datasets")) {
                repoId = urlPath.substring(10)
                repoType = 'dataset'
            }
            showToast("Forking, See more in your Colab!")
            var cmd = `!ait-fork --source_repo=${repoId} --hf_username=$HF_USERNAME --hf_token=$HF_TOKEN --repo_type=${repoType}`
            GM_setValue(listenerKey, cmd);
        });
        // Add the button element to the document
        document.body.appendChild(button);
    }
    if (window.location.host == 'colab.research.google.com') {
        var timer = setInterval(() => {
            try {
                if (document.title.split(' - ')[0].trim() == 'fork-huggingface.ipynb') {
                    showToast("Your Colab is watching hugging face fork!")
                    console.warn("Your Colab is watching hugging face fork!")
                    clearInterval(timer)
                    GM_addValueChangeListener(listenerKey, function (name, oldValue, newValue, remote) {
                        if (!newValue) {
                            return
                        }
                        document.querySelector('[command="insert-cell-below"]').click()
                        var editors = monaco.editor.getEditors()
                        var insertEditorIndex = editors.length - 1
                        var lastEditor = editors[insertEditorIndex]
                        lastEditor.setValue(newValue);
                        document.querySelectorAll("colab-run-button")[insertEditorIndex].click()
                        GM_setValue(listenerKey, null);
                    });
                } else {
                }
            } catch (error) {
                console.log(error)
            }
        }, 1000);

    }
    if (window.location.host == 'huggingface.co') {
        GM_addValueChangeListener(listenerKey, function (name, oldValue, newValue, remote) {
            if (!newValue) {
                return
            }
            console.warn("Forking, See more in your Colab!")
        });
        var cardName = document.querySelectorAll(".tab-alternate")[0].text.trim()
        if (cardName == 'Model card' || cardName == 'Dataset card') {
            addForkButton()
        } else {
        }
    }
})();