(function () {
    var form = document.getElementById('diag');
    var step = 0;
    var maxStep = 7;
    var screens = form.querySelectorAll('.screen');
    var bar = document.getElementById('pbar');
    var back = document.getElementById('back');
    var next = document.getElementById('next');
    var result = document.getElementById('result');

    function show(n) {
        screens.forEach(function (s) {
            s.classList.toggle('active', +s.dataset.step === n);
        });
        bar.style.width = ((n / maxStep) * 100) + '%';
        back.disabled = (n === 0);
        next.innerHTML = (n === maxStep)
            ? 'Reveal My Profile <span class="ar">&#8594;</span>'
            : 'Next <span class="ar">&#8594;</span>';
    }

    form.addEventListener('change', function (e) {
        if (e.target.name) {
            form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(function (i) {
                i.closest('.option') && i.closest('.option').classList.remove('sel');
            });
            if (e.target.checked && e.target.closest('.option')) {
                e.target.closest('.option').classList.add('sel');
            }
        }
    });

    back.addEventListener('click', function () {
        if (step > 0) { step--; show(step); }
    });

    next.addEventListener('click', function () {
        if (step === 0) {
            var em = document.getElementById('f-email').value.trim();
            if (!em) {
                alert('Please add a work email so we can send your profile and the primer.');
                document.getElementById('f-email').focus();
                return;
            }
        } else {
            var sel = form.querySelector('.screen[data-step="' + step + '"] input:checked');
            if (!sel) {
                alert('Please choose an answer to continue.');
                return;
            }
        }

        if (step < maxStep) { step++; show(step); return; }

        var total = 0;
        var ok = true;
        for (var i = 1; i <= 7; i++) {
            var s = form.querySelector('input[name="q' + i + '"]:checked');
            if (!s) { ok = false; break; }
            total += parseInt(s.value, 10);
        }
        if (!ok) { alert('Please answer all seven questions.'); return; }

        var tier, title, body;
        if (total <= 6) {
            tier = 'Implementation Gap: Minimal';
            title = 'Strong implementation coherence.';
            body = 'Your organization shows strong coherence — the gap is narrow. Your next move is protecting it as you scale. You are a fit for an advisory engagement rather than triage.';
        } else if (total <= 13) {
            tier = 'Implementation Gap: Emerging';
            title = 'Real strengths, specific fault lines.';
            body = 'You have genuine strengths and specific places where signal, capacity, consent, and governance are pulling apart. A scoped audit would show you exactly where — and what to do first.';
        } else {
            tier = 'Implementation Gap: Structural';
            title = 'Detection is outrunning capacity.';
            body = 'Detection is outrunning your capacity to act, consent, and govern. This is the Implementation Gap at structural scale — and it is addressable, in sequence. A scoped audit is the diagnostic first step.';
        }

        document.getElementById('rTier').textContent = tier;
        document.getElementById('rTitle').textContent = title;
        document.getElementById('rBody').textContent = body;

        form.style.display = 'none';
        result.classList.add('show');
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    show(0);
})();

