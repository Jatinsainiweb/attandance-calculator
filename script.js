// Calculate attendance percentage
function calculateAttendance() {
    const total = parseInt(document.getElementById('total').value);
    const attended = parseInt(document.getElementById('attended').value);

    if (isNaN(total) || isNaN(attended) || total <= 0) {
        alert('Please enter valid numbers');
        return;
    }

    if (attended > total) {
        alert('Attended classes cannot be more than total classes');
        return;
    }

    const percentage = (attended / total) * 100;
    const resultElement = document.getElementById('result');
    const percentageElement = resultElement.querySelector('.percentage');
    const statusFill = resultElement.querySelector('.status-fill');
    const statusText = resultElement.querySelector('.status-text');

    percentageElement.textContent = percentage.toFixed(2) + '%';
    statusFill.style.width = Math.min(percentage, 100) + '%';
    statusFill.style.backgroundColor = percentage >= 75 ? 'var(--success)' : 'var(--danger)';

    if (percentage >= 75) {
        statusText.textContent = '✅ You are meeting the attendance requirement';
        statusText.style.color = 'var(--success)';
    } else {
        statusText.textContent = '⚠️ Your attendance is below 75%';
        statusText.style.color = 'var(--danger)';
    }

    resultElement.classList.remove('hidden');
}

// Calculate required classes
function calculateRequired() {
    const currentTotal = parseInt(document.getElementById('currentTotal').value);
    const currentAttended = parseInt(document.getElementById('currentAttended').value);
    const targetPercentage = parseInt(document.getElementById('targetPercentage').value);

    if (isNaN(currentTotal) || isNaN(currentAttended) || isNaN(targetPercentage) || 
        currentTotal <= 0 || targetPercentage <= 0 || targetPercentage > 100) {
        alert('Please enter valid numbers');
        return;
    }

    if (currentAttended > currentTotal) {
        alert('Attended classes cannot be more than total classes');
        return;
    }

    const currentPercentage = (currentAttended / currentTotal) * 100;
    const resultElement = document.getElementById('requiredResult');
    const requiredNumber = resultElement.querySelector('.required-number');
    const requiredText = resultElement.querySelector('.required-text');

    // If current percentage is already higher than target
    if (currentPercentage >= targetPercentage) {
        requiredNumber.textContent = '0';
        requiredText.textContent = '✅ You have already achieved your target percentage!';
        requiredText.style.color = 'var(--success)';
        resultElement.classList.remove('hidden');
        return;
    }

    // Calculate required classes using the correct formula
    // For target percentage P, current attended A, and current total T
    // Let x be the number of additional classes needed
    // Then: (A + x)/(T + x) = P/100
    // Solving for x: x = (P*T - 100*A)/(100 - P)
    const P = targetPercentage;
    const T = currentTotal;
    const A = currentAttended;
    
    let classesNeeded = Math.ceil((P * T - 100 * A)/(100 - P));
    
    // Verify the calculation
    const finalPercentage = (currentAttended + classesNeeded) / (currentTotal + classesNeeded) * 100;
    
    // Add one more class if we're still slightly below target due to rounding
    if (finalPercentage < targetPercentage) {
        classesNeeded++;
    }

    requiredNumber.textContent = classesNeeded;
    
    if (classesNeeded === 0) {
        requiredText.textContent = '✅ You have already achieved your target percentage!';
        requiredText.style.color = 'var(--success)';
    } else {
        requiredText.textContent = `You need to attend ${classesNeeded} more classes to reach ${targetPercentage}%`;
        requiredText.style.color = 'var(--dark)';
    }

    resultElement.classList.remove('hidden');
}

// Toggle FAQ answers
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
