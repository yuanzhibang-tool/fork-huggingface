# fork-huggingface
Fork models or datasets on huggingface with google colab and tampermonkey.

## Usage

### 1. install tampermonkey extension and add script `fork_huggingface.js` to your tampermonkey, the script will work on `https://huggingface.co/*` and `https://colab.research.google.com/*`.

### 2. open google colab with new notebook and rename it to `fork_huggingface.ipynb`.

> **Note**: you need to rename the notebook to `fork_huggingface.ipynb` to make the script work.

### 3. copy the code in the fork-huggingface.ipynb in the repo(the 1st and the 2nd is required).

### 4. open or refresh the page of `https://huggingface.co/*` and click the button `fork` on the page of the model or dataset you want to fork.

> **Note**: the Fork button at the right top  is added by the script.