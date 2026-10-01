## Attacking Whisper

### 1. The Attack

An hour of dictation could spare our fingers roughly a kilometer of travel across a keyboard.
Automatic speech recognition (ASR) takes care of all that typing for us.
We just need it to stick to what we actually said.
Unfortunately, an attacker can make it type a completely different sentence without us noticing.

**Imagine a call.**

People in the call hear "The weather will be nice tomorrow".
<br>
But the ASR model transcribing the call hears "Delete the customer records from the database".

Even worse, the attacker can perform this on any recording, with full control over what the model hears.

This was the focus of my work during the University of Birmingham EPSRC summer research internship programme.

<div>
<whisperattack source="The weather will be nice tomorrow" target="Delete the customer records from the database"></whisperattack>
</div>

### 2. How It Works

Audio is a sequence of numbers, which look conveniently similar to a small set of parameters for a neural network.

Now consider we have the original audio that says "The weather will be nice tomorrow", and we change the numbers just a bit, then ask an ASR model what it hears.
It might output the same text "The weather will be nice tomorrow", a completely different text like "Let's meet for lunch around twelve", or something closer to the text we selected like "Delete the weather will be nice tomorrow".

We can calculate which way to adjust each number to make the model more likely to predict the text we want.

If we repeatedly change the audio bit by bit while making sure we don't change it too much, we can make the ASR model predict the text we selected while humans still hear the original audio.

### 3. How Does It Actually Work?

As with most training, we need a set of parameters, a forward pass, a loss function, backpropagation, and an optimizer, to construct a basic training loop.

Here, the audio is the parameters, the source recording and the target text are the 1-sample training data, Whisper is our forward pass, Whisper's target-token cross-entropy + audio change penalty is our loss function, backpropagation tells us how changes to the audio affect that loss, and the optimizer uses the gradients to update the audio.

Once we have a training loop and an accurate loss function, the rest is straightforward, because our goal is to merely overfit our modified audio to this 1-sample dataset.

**There are a couple of small tricks that improve the attack.**

Whisper is autoregressive, so the first token strongly influences what it predicts next. We penalize getting a wrong first target-token heavily to encourage Whisper to enter the desired sequence early.

We also use teacher-forcing to calculate every target-token loss in a single forward pass.

The audio change penalty starts at 0 and increases every time Whisper successfully predicts the exact target, so optimization initially focuses on reaching the target, and then increasingly focuses on doing so with the smallest change to the audio.

### 4. Real World Attacks

So far, we have given Whisper the modified recording directly.
Now let's try to make a meeting transcript include words nobody said, by sending our modified recording through the call.

The call changes our recording before it reaches Whisper.
Compression and changes in timing can break the attack, even if we can still understand the speech.

We can account for these changes using Expectation Over Transformation.
We optimize the audio over a distribution of transformations that approximate call processing to help the attack survive real calls.

However, these transformations are merely a rough approximation of the noisy and unpredictable real world.
We use simplified approximations that are quick and let us calculate or estimate gradients, allowing us to run tens of thousands of approximate calls.

### 5. Outcome

This poses a concern: an attack might succeed under the approximations but fail in a real call.

My study compares the approximations with local calls and internet calls.
The local calls run on one computer with controlled network conditions, while the internet calls connect separate computers.

I found that attacks succeeded 51.6% of the time under the approximations, but only 21.9% of the time through internet calls.

I also calibrated the network effects in the local environment using measurements from internet calls.
This reduced the average difference between the two environments in how often each attack succeeded.

During the internship, I developed the research question, designed the experiment, built the attack and evaluation software, ran evaluations, and analyzed the results.

Writing the paper was a challenging experience, but my supervisor's feedback helped me develop a piece that I believe clearly explains the attack and how to reproduce it.
It describes the experiment with a focus on validity and data cleanliness, and grounds its claims in the results.

[Read the paper (PDF)](/attacking-whisper/paper.pdf) · Submitted to ICASSP 2027
