window.onload = function() {
    var titleElement = document.getElementsByClassName('title')[0];
    if (titleElement) {
        titleElement.classList.add('animate-Up');
    }

    var subtitleElement = document.getElementsByClassName('subtitle')[0];
    if (subtitleElement) {
        subtitleElement.classList.add('animate-Down');
    }
};

var stage1_Form = document.querySelector(".stage.p1");
var stage2_Form = document.querySelector(".stage.p2");
var stage3_Form = document.querySelector(".stage.p3");

var stage1Next = document.getElementById("stage1Next");
var stage2Previous = document.getElementById("stage2Previous");
var stage2Next = document.getElementById("stage2Next");
var stage3Previous = document.getElementById("stage3Previous");
var stage3SubmitButton = document.querySelector(".stage.p3 .submit");

var stage1Icon = document.querySelector(".circle.p1");
var stage2Icon = document.querySelector(".circle.p2");
var stage3Icon = document.querySelector(".circle.p3");

// Event listener for Next button in Stage 1
stage1Next.addEventListener('click', function() {
    if (!validateStage1()) {
        return;
    }
    transitionStages(stage1_Form, stage2_Form, "animate-Left", "animate-Right");
    stage1Icon.classList.remove("active");
    stage2Icon.classList.add("active");
});

// Event listener for moving back from Stage 2 to Stage 1
stage2Previous.addEventListener('click', function() {
    transitionStages(stage2_Form, stage1_Form, "animate-Right", "animate-Left");
    stage2Icon.classList.remove("active");
    stage1Icon.classList.add("active");
});

// Event listener for moving from Stage 2 to Stage 3
stage2Next.addEventListener('click', function() {
    if (!validateStage2()) {
        return;
    }
    transitionStages(stage2_Form, stage3_Form, "animate-Left", "animate-Right");
    stage2Icon.classList.remove("active");
    stage3Icon.classList.add("active");
});

// Event listener for moving back from Stage 3 to Stage 2
stage3Previous.addEventListener('click', function() {
    transitionStages(stage3_Form, stage2_Form, "animate-Right", "animate-Left");
    stage3Icon.classList.remove("active");
    stage2Icon.classList.add("active");
});

// Event listener for form submission
document.querySelector(".form-main").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault();
        alert("Please accomplish the form correctly.");
    } else {
        alert("Form submitted successfully!");
        // Optionally, redirect to a success page or perform other actions
    }
});

function transitionStages(hideStage, showStage, hideAnimation, showAnimation) {
    hideStage.classList.add(hideAnimation);
    showStage.classList.add(showAnimation);

    hideStage.addEventListener('animationend', function onAnimationEnd() {
        hideStage.classList.remove("active", hideAnimation);
        showStage.classList.add("active");
        showStage.classList.remove(showAnimation);

        hideStage.removeEventListener('animationend', onAnimationEnd);
    });
}

// Function to validate Stage 1 inputs
function validateStage1() {
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    if (password === '' || confirmPassword === '') {
        alert('Please fill in both Password and Confirm Password fields.');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please enter matching passwords.');
        return false;
    }

    return true;
}

// Function to validate Stage 2 inputs
function validateStage2() {
    const studentId = document.getElementById('studentid').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate PUP Student ID format
    const studentIdPattern = /^\d{4}-\d{5}-[M-N]{2}-\d$/;
    if (!studentIdPattern.test(studentId)) {
        alert('Invalid PUP Student ID format. Please enter in the format 20XX-00000-MN-0');
        return false;
    }

    // Validate Contact Number format
    const contactPattern = /^09\d{9}$/;
    if (!contactPattern.test(contact)) {
        alert('Invalid Contact Number format. Please enter in the format 09XXXXXXXXX');
        return false;
    }

    return true;
}

// Function to validate entire form before submission
function validateForm() {
    if (!validateStage1()) {
        return false;
    }

    if (!validateStage2()) {
        return false;
    }

    // Validate Stage 3 inputs
    const department = document.getElementById('department').value.trim();
    const course = document.getElementById('course').value.trim();
    const section = document.getElementById('section').value.trim();
    const academicYear = document.getElementById('academic-year').value.trim();
    const supervisor = document.getElementById('supervisor').value.trim();

    if (department === '' || course === '' || section === '' || academicYear === '' || supervisor === '') {
        alert('Please fill in all fields in Stage 3.');
        return false;
    }

    return true;
}






document.addEventListener('DOMContentLoaded', function () {
    const departmentSelect = document.getElementById('department');
    const courseSelect = document.getElementById('course');
    const sectionSelect = document.getElementById('section');

    const departmentOptions = [
        { value: '', text: 'Select Department' }, // Blank default option
        { value: 'Biology', text: 'Biology' },
        { value: 'Food Technology', text: 'Food Technology' },
        { value: 'Mathematics & Statistics', text: 'Mathematics & Statistics' },
        { value: 'Nutrition & Dietetics', text: 'Nutrition & Dietetics' },
        { value: 'Physical Sciences', text: 'Physical Sciences' }
    ];

    const courses = {
        'Biology': [
            { value: 'BS Biology', text: 'BS Biology', sections: ['3-1', '3-2', '3-3', '3-4', '3-5']}
        ],
        'Mathematics & Statistics': [
            { value: 'BS Applied Math', text: 'BS Applied Math', sections: ['3-1', '3-2'] },
            { value: 'BS Mathematics', text: 'BS Mathematics', sections: ['3-1', '3-2', '3-3'] }
        ],
        'Nutrition & Dietetics': [
            { value: 'BS Nutrition', text: 'BS Nutrition', sections: ['3-1D', '3-2N'] }
        ],
        'Food Technology': [
            { value: 'BS Food Technology', text: 'BS Food Technology', sections: ['3-1D', '3-2N'] }
        ],
        'Physical Sciences': [
            { value: 'BS Chemistry', text: 'BS Chemistry', sections: ['3-1', '3-2'] },
            { value: 'BS Physics', text: 'BS Physics', sections: ['3-1', '3-2'] }
        ]
    };

    // Function to populate options for the courses based on selected department
    function populateCourseOptions(departmentSelectValue) {
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        sectionSelect.innerHTML = '<option value="">Select Section</option>';

        if (courses[departmentSelectValue]) {
            courses[departmentSelectValue].forEach(course => {
                const option = document.createElement('option');
                option.value = course.value;
                option.textContent = course.text;
                courseSelect.appendChild(option);
            });
        }

        // Trigger section population for the default selected course
        const defaultCourseValue = courseSelect.value;
        populateSectionOptions(defaultCourseValue, departmentSelectValue);
    }

    // Function to populate options for the sections based on selected course and department
    function populateSectionOptions(courseSelectValue, departmentSelectValue) {
        sectionSelect.innerHTML = '<option value="">Select Section</option>';

        const selectedCourse = courses[departmentSelectValue].find(course => course.value === courseSelectValue);
        if (selectedCourse && selectedCourse.sections) {
            selectedCourse.sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section;
                option.textContent = section;
                sectionSelect.appendChild(option);
            });
        }
    }

    // Populate department options on page load
    departmentOptions.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        departmentSelect.appendChild(option);
    });

    // Event listener for department select field
    departmentSelect.addEventListener('click', function () {
        // Check if the options have already been populated
        if (departmentSelect.children.length === 1 && departmentSelect.children[0].value === '') {
            // Remove the initial blank option
            departmentSelect.removeChild(departmentSelect.children[0]);

            // Populate department options if not already populated
            departmentOptions.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                departmentSelect.appendChild(option);
            });
        }
    });

    // Populate courses when department selection changes
    departmentSelect.addEventListener('change', function () {
        populateCourseOptions(departmentSelect.value);
    });

    // Populate sections when course selection changes
    courseSelect.addEventListener('change', function () {
        populateSectionOptions(courseSelect.value, departmentSelect.value);
    });

    // Initial population when the DOM content is loaded
    populateCourseOptions(departmentSelect.value); // Populate courses based on default department
});

