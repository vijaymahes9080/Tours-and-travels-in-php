// Mock packages data representing tbltourpackages in the database
const defaultPackages = [
  {
    PackageId: 1,
    PackageName: "Coorg Hill Station Tour",
    PackageType: "Family / Adventure",
    PackageLocation: "Coorg, Karnataka, India",
    PackagePrice: "250",
    PackageFetures: "Free Wi-Fi, Breakfast, Sightseeing Tour, Hotel Stay",
    PackageDetails: "Coorg, also known as Kodagu, is an affluent hill station in Karnataka. It is famous for its coffee plantations, lush green forests, stunning waterfalls, and rich history. Ideal for trekking and nature lovers.",
    PackageImage: "coorg-hill-station1.jpg"
  },
  {
    PackageId: 2,
    PackageName: "Golden Triangle Tour",
    PackageType: "Cultural / Historical",
    PackageLocation: "Delhi - Agra - Jaipur, India",
    PackagePrice: "450",
    PackageFetures: "AC Transport, Tour Guide, 4-Star Hotels, Buffet Breakfast",
    PackageDetails: "Explore India's historic Golden Triangle. Visit the legendary Taj Mahal in Agra, the grand palaces and forts of Jaipur, and the historic landmarks of New Delhi.",
    PackageImage: "banner1.png"
  },
  {
    PackageId: 3,
    PackageName: "Maldives Beach Resort Holiday",
    PackageType: "Honeymoon / Leisure",
    PackageLocation: "Male, Maldives",
    PackagePrice: "1200",
    PackageFetures: "Overwater Villa, All Meals Included, Spa Treatment, Speedboat Transfer",
    PackageDetails: "Experience the ultimate beach holiday in the Maldives. Stay in luxurious overwater villas, swim in crystal clear turquoise lagoons, and enjoy world-class hospitality.",
    PackageImage: "images.jpg"
  },
  {
    PackageId: 4,
    PackageName: "Manali Alpine Escape",
    PackageType: "Winter / Couples",
    PackageLocation: "Manali, Himachal Pradesh, India",
    PackagePrice: "350",
    PackageFetures: "Snow Activities, Private Cab, Room Heater, Paragliding Tour",
    PackageDetails: "Escape to the snow-capped peaks of Manali. Enjoy skiing, trekking in Solang Valley, and visiting the historic temples and local markets.",
    PackageImage: "coorg-hill-station1.jpg"
  }
];

// Helper to get query parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Check login state and user
function getLoggedInUser() {
  const userJson = localStorage.getItem('logged_in_user');
  return userJson ? JSON.parse(userJson) : null;
}

// Check registered users
function getRegisteredUsers() {
  const users = localStorage.getItem('registered_users');
  return users ? JSON.parse(users) : {};
}

// Get user bookings
function getBookings() {
  const bookings = localStorage.getItem('bookings');
  return bookings ? JSON.parse(bookings) : [];
}

// Initialize template injections
document.addEventListener("DOMContentLoaded", function () {
  const user = getLoggedInUser();

  // Inject top header
  const topHeaderDiv = document.createElement('div');
  topHeaderDiv.className = 'top-header';
  
  let topHeaderLeft = '';
  let topHeaderRight = '';

  if (user) {
    topHeaderLeft = `
      <ul class="tp-hd-lft wow fadeInLeft animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInLeft;">
        <li class="hm"><a href="index.html"><i class="fa fa-home"></i></a></li>
        <li class="prnt"><a href="profile.html">My Profile</a></li>
        <li class="prnt"><a href="change-password.html">Change Password</a></li>
        <li class="prnt"><a href="tour-history.html">My Tour History</a></li>
        <li class="prnt"><a href="issuetickets.html">Issue Tickets</a></li>
      </ul>`;
    topHeaderRight = `
      <ul class="tp-hd-rgt wow fadeInRight animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"> 
        <li class="tol">Welcome :</li>				
        <li class="sig">${user.name || user.email}</li> 
        <li class="sigi"><a href="#" id="static-logout">/ Logout</a></li>
      </ul>`;
  } else {
    topHeaderLeft = `
      <ul class="tp-hd-lft wow fadeInLeft animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInLeft;">
        <li class="hm"><a href="index.html"><i class="fa fa-home"></i></a></li>
        <li class="hm"><a href="admin/index.php">Admin Login</a></li>
      </ul>`;
    topHeaderRight = `
      <ul class="tp-hd-rgt wow fadeInRight animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"> 
        <li class="sig"><a href="#" data-toggle="modal" data-target="#myModal">Sign Up</a></li> 
        <li class="sigi"><a href="#" data-toggle="modal" data-target="#myModal4">/ Sign In</a></li>
      </ul>`;
  }

  topHeaderDiv.innerHTML = `
    <div class="container">
      ${topHeaderLeft}
      ${topHeaderRight}
      <div class="clearfix"></div>
    </div>`;
  document.body.insertBefore(topHeaderDiv, document.body.firstChild);

  // Inject primary header (Logo)
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';
  headerDiv.innerHTML = `
    <div class="container">
      <div class="logo wow fadeInDown animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInDown;">
        <a href="index.html">Tourism <span>Management System</span></a>	
      </div>
      <div class="lock fadeInDown animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInDown;"> 
        <li><i class="fa fa-lock"></i></li>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
    </div>`;
  topHeaderDiv.insertAdjacentElement('afterend', headerDiv);

  // Inject navbar
  const navDiv = document.createElement('div');
  navDiv.className = 'footer-btm wow fadeInLeft animated';
  navDiv.setAttribute('data-wow-delay', '.5s');
  navDiv.style.visibility = 'visible';
  navDiv.style.animationDelay = '0.5s';
  navDiv.style.animationName = 'fadeInLeft';
  
  let helpMenuItem = user 
    ? `<li>Need Help?<a href="#" data-toggle="modal" data-target="#myModal3"> / Write Us </a></li>`
    : `<li><a href="enquiry.html"> Enquiry </a></li>`;

  navDiv.innerHTML = `
    <div class="container">
      <div class="navigation">
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse nav-wil" id="bs-example-navbar-collapse-1">
            <nav class="cl-effect-1">
              <ul class="nav navbar-nav">
                <li><a href="index.html">Home</a></li>
                <li><a href="page.html?type=aboutus">About</a></li>
                <li><a href="package-list.html">Tour Packages</a></li>
                <li><a href="page.html?type=privacy">Privacy Policy</a></li>
                <li><a href="page.html?type=terms">Terms of Use</a></li>
                <li><a href="page.html?type=contact">Contact Us</a></li>
                ${helpMenuItem}
                <div class="clearfix"></div>
              </ul>
            </nav>
          </div>
        </nav>
      </div>
      <div class="clearfix"></div>
    </div>`;
  headerDiv.insertAdjacentElement('afterend', navDiv);

  // Inject modals (Signup, Signin, Write-us)
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <!-- Signup Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>						
          </div>
          <section>
            <div class="modal-body modal-spa">
              <div class="login-grids">
                <div class="login">
                  <div class="login-right">
                    <form id="static-signup-form">
                      <h3>Create your account </h3>
                      <input type="text" placeholder="Full Name" name="fname" required="">
                      <input type="text" placeholder="Mobile number" maxlength="10" name="mobilenumber" required="">
                      <input type="email" placeholder="Email id" name="email" id="signup-email" required="">	
                      <input type="password" placeholder="Password" name="password" required="">	
                      <input type="submit" value="CREATE ACCOUNT">
                    </form>
                  </div>
                  <div class="clearfix"></div>								
                </div>
                <p>By logging in you agree to our <a href="page.html?type=terms">Terms and Conditions</a> and <a href="page.html?type=privacy">Privacy Policy</a></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Signin Modal -->
    <div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content modal-info">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>						
          </div>
          <div class="modal-body modal-spa">
            <div class="login-grids">
              <div class="login">
                <div class="login-right">
                  <form id="static-signin-form">
                    <h3>Signin with your account </h3>
                    <input type="email" name="email" placeholder="Enter your Email" required="">	
                    <input type="password" name="password" placeholder="Password" required="">	
                    <h4><a href="forgot-password.html">Forgot password</a></h4>
                    <input type="submit" value="SIGNIN">
                  </form>
                </div>
                <div class="clearfix"></div>								
              </div>
              <p>By logging in you agree to our <a href="page.html?type=terms">Terms and Conditions</a> and <a href="page.html?type=privacy">Privacy Policy</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Write Us Modal -->
    <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>						
          </div>
          <section>
            <form id="static-write-us-form">
              <div class="modal-body modal-spa">
                <div class="writ">
                  <h4>HOW CAN WE HELP YOU</h4>
                  <ul>
                    <li class="na-me">
                      <select name="issue" class="frm-field required sect" required="">
                        <option value="">Select Issue</option> 		
                        <option value="Booking Issues">Booking Issues</option>
                        <option value="Cancellation"> Cancellation</option>
                        <option value="Refund">Refund</option>
                        <option value="Other">Other</option>														
                      </select>
                    </li>
                    <li class="descrip">
                      <input class="special" type="text" placeholder="Description" name="description" required="">
                    </li>
                    <div class="clearfix"></div>
                  </ul>
                  <div class="sub-bn">
                    <button type="submit" class="subbtn">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modalContainer);

  // Inject footer
  const footerDiv = document.createElement('div');
  footerDiv.className = 'copy-right';
  footerDiv.innerHTML = `
    <div class="container">
      <div class="footer-social-icons wow fadeInDown animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInDown;">
        &copy; Copyright ${new Date().getFullYear()}. All Rights Reserved | Developed by <a href="mailto:Vijaypradhap2004@gmail.com">Vijay Mahes</a>
      </div>
    </div>`;
  document.body.appendChild(footerDiv);

  // Setup form submission events
  
  // Signup Mock Action
  const signupForm = document.getElementById('static-signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const fname = e.target.fname.value;
      const mnumber = e.target.mobilenumber.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      const users = getRegisteredUsers();
      users[email] = { name: fname, mnumber: mnumber, password: password };
      localStorage.setItem('registered_users', JSON.stringify(users));

      alert("You are successfully registered! Now you can login.");
      $('#myModal').modal('hide');
      $('#myModal4').modal('show');
    });
  }

  // Signin Mock Action
  const signinForm = document.getElementById('static-signin-form');
  if (signinForm) {
    signinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const users = getRegisteredUsers();
      // Dummy check for seed accounts or registered ones
      if (email === 'demo@test.com' || (users[email] && users[email].password === password)) {
        const name = users[email] ? users[email].name : 'Demo User';
        localStorage.setItem('logged_in_user', JSON.stringify({ email: email, name: name }));
        alert("Logged in successfully!");
        window.location.reload();
      } else {
        // Fallback: If no registered, let them log in anyway for demo purposes!
        localStorage.setItem('logged_in_user', JSON.stringify({ email: email, name: 'Guest User' }));
        alert("Logged in as Guest for preview!");
        window.location.reload();
      }
    });
  }

  // Logout Mock Action
  const logoutBtn = document.getElementById('static-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('logged_in_user');
      alert("Logged out successfully!");
      window.location.href = 'index.html';
    });
  }

  // Write Us Mock Action
  const writeUsForm = document.getElementById('static-write-us-form');
  if (writeUsForm) {
    writeUsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!user) {
        alert("Please login first to submit support requests.");
        return;
      }
      const issue = e.target.issue.value;
      const description = e.target.description.value;

      const issues = JSON.parse(localStorage.getItem('support_issues') || '[]');
      issues.push({
        id: '#' + Math.floor(Math.random() * 900000 + 100000),
        email: user.email,
        issue: issue,
        description: description,
        date: new Date().toLocaleDateString(),
        status: 'Open'
      });
      localStorage.setItem('support_issues', JSON.stringify(issues));

      alert("Your issue request has been submitted successfully!");
      $('#myModal3').modal('hide');
      if (window.location.pathname.includes('issuetickets.html')) {
        window.location.reload();
      }
    });
  }

  // Handle index.html page specific code
  if (document.getElementById('static-packages-container')) {
    renderHomePackages();
  }

  // Handle package-list.html page specific code
  if (document.getElementById('static-all-packages')) {
    renderAllPackages();
  }

  // Handle package-details.html page specific code
  if (document.getElementById('static-package-details')) {
    renderPackageDetails();
  }

  // Handle tour-history.html
  if (document.getElementById('static-tour-history')) {
    renderTourHistory();
  }

  // Handle profile.html
  if (document.getElementById('static-profile')) {
    renderProfile();
  }

  // Handle issuetickets.html
  if (document.getElementById('static-issues')) {
    renderIssues();
  }
});

// Render 4 Packages on Home Page
function renderHomePackages() {
  const container = document.getElementById('static-packages-container');
  container.innerHTML = '';
  
  // Grab first 4 default packages
  defaultPackages.forEach(pkg => {
    const pkgHtml = `
      <div class="rom-btm">
        <div class="col-md-3 room-left wow fadeInLeft animated" data-wow-delay=".5s">
          <img src="admin/pacakgeimages/${pkg.PackageImage}" class="img-responsive" alt="${pkg.PackageName}">
        </div>
        <div class="col-md-6 room-midle wow fadeInUp animated" data-wow-delay=".5s">
          <h4>Package Name: ${pkg.PackageName}</h4>
          <h6>Package Type : ${pkg.PackageType}</h6>
          <p><b>Package Location :</b> ${pkg.PackageLocation}</p>
          <p><b>Features :</b> ${pkg.PackageFetures}</p>
        </div>
        <div class="col-md-3 room-right wow fadeInRight animated" data-wow-delay=".5s">
          <h5>USD ${pkg.PackagePrice}</h5>
          <a href="package-details.html?pkgid=${pkg.PackageId}" class="view">Details</a>
        </div>
        <div class="clearfix"></div>
      </div>`;
    container.innerHTML += pkgHtml;
  });
}

// Render All Packages on List Page
function renderAllPackages() {
  const container = document.getElementById('static-all-packages');
  container.innerHTML = '';
  
  defaultPackages.forEach(pkg => {
    const pkgHtml = `
      <div class="rom-btm">
        <div class="col-md-3 room-left wow fadeInLeft animated" data-wow-delay=".5s">
          <img src="admin/pacakgeimages/${pkg.PackageImage}" class="img-responsive" alt="${pkg.PackageName}">
        </div>
        <div class="col-md-6 room-midle wow fadeInUp animated" data-wow-delay=".5s">
          <h4>Package Name: ${pkg.PackageName}</h4>
          <h6>Package Type : ${pkg.PackageType}</h6>
          <p><b>Package Location :</b> ${pkg.PackageLocation}</p>
          <p><b>Features :</b> ${pkg.PackageFetures}</p>
        </div>
        <div class="col-md-3 room-right wow fadeInRight animated" data-wow-delay=".5s">
          <h5>USD ${pkg.PackagePrice}</h5>
          <a href="package-details.html?pkgid=${pkg.PackageId}" class="view">Details</a>
        </div>
        <div class="clearfix"></div>
      </div>`;
    container.innerHTML += pkgHtml;
  });
}

// Render Specific Package Details
function renderPackageDetails() {
  const pkgId = parseInt(getQueryParam('pkgid')) || 1;
  const pkg = defaultPackages.find(p => p.PackageId === pkgId) || defaultPackages[0];
  const user = getLoggedInUser();

  const container = document.getElementById('static-package-details');
  container.innerHTML = `
    <div class="selectroom_top">
      <div class="col-md-4 selectroom_left wow fadeInLeft animated" data-wow-delay=".5s">
        <img src="admin/pacakgeimages/${pkg.PackageImage}" class="img-responsive" alt="${pkg.PackageName}">
      </div>
      <div class="col-md-8 selectroom_right wow signup-right fadeInRight animated" data-wow-delay=".5s">
        <h2>${pkg.PackageName}</h2>
        <p class="dow">#PKG-${pkg.PackageId}</p>
        <p><b>Package Type :</b> ${pkg.PackageType}</p>
        <p><b>Package Location :</b> ${pkg.PackageLocation}</p>
        <p><b>Features :</b> ${pkg.PackageFetures}</p>
        
        <form id="static-booking-form">
          <div class="ban-bottom">
            <div class="bnr-one">
              <label class="inputLabel">From Date</label>
              <input class="date" id="datepicker" type="date" placeholder="dd-mm-yyyy" name="fromdate" required="">
            </div>
            <div class="bnr-one">
              <label class="inputLabel">To Date</label>
              <input class="date" id="datepicker1" type="date" placeholder="dd-mm-yyyy" name="todate" required="">
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="grand">
            <p>Price per Person</p>
            <h3>USD ${pkg.PackagePrice}</h3>
          </div>
          <div class="selectroom-info animated wow fadeInUp animated" data-wow-duration="1200ms" data-wow-delay="500ms">
            <ul>
              <li class="spe">
                <label class="inputLabel">Comment / Custom Requests</label>
                <textarea class="special" rows="4" cols="50" name="comment" placeholder="Any special instructions?"></textarea>
              </li>
              <li class="spe" style="margin-top: 15px;">
                <button type="submit" class="btn btn-primary" style="background: #34ad00; border-color: #34ad00; padding: 10px 30px;">Book Package</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div class="clearfix"></div>
      <div class="selectroom_tab wow selectroom-info fadeInUp animated" data-wow-delay=".5s">
        <h3>Package Details</h3>
        <p>${pkg.PackageDetails}</p>
      </div>
    </div>`;

  // Booking Form Submission Handler
  const bookingForm = document.getElementById('static-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!user) {
        alert("Please login to proceed with booking.");
        $('#myModal4').modal('show');
        return;
      }
      const fromDate = e.target.fromdate.value;
      const toDate = e.target.todate.value;
      const comment = e.target.comment.value;

      const bookings = getBookings();
      bookings.push({
        id: '#' + Math.floor(Math.random() * 90000 + 10000),
        pkgName: pkg.PackageName,
        pkgId: pkg.PackageId,
        userEmail: user.email,
        from: fromDate,
        to: toDate,
        comment: comment,
        status: 'Pending',
        regDate: new Date().toLocaleDateString()
      });
      localStorage.setItem('bookings', JSON.stringify(bookings));

      window.location.href = 'thankyou.html';
    });
  }
}

// Render Tour History
function renderTourHistory() {
  const user = getLoggedInUser();
  const container = document.getElementById('static-tour-history');
  
  if (!user) {
    container.innerHTML = `<tr><td colspan="7" class="text-center">Please login to view your tour history.</td></tr>`;
    return;
  }

  const allBookings = getBookings();
  const userBookings = allBookings.filter(b => b.userEmail === user.email);

  if (userBookings.length === 0) {
    container.innerHTML = `<tr><td colspan="7" class="text-center">No bookings found. <a href="package-list.html">Book a package now!</a></td></tr>`;
    return;
  }

  container.innerHTML = '';
  userBookings.forEach((b, index) => {
    let statusClass = 'text-warning';
    if (b.status === 'Approved') statusClass = 'text-success';
    if (b.status === 'Cancelled') statusClass = 'text-danger';

    let actionBtn = b.status === 'Pending' 
      ? `<button onclick="cancelStaticBooking('${b.id}')" class="btn btn-danger btn-xs">Cancel</button>` 
      : `N/A`;

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${b.id}</td>
        <td><a href="package-details.html?pkgid=${b.pkgId}">${b.pkgName}</a></td>
        <td>${b.from}</td>
        <td>${b.to}</td>
        <td>${b.comment || '-'}</td>
        <td class="${statusClass}"><b>${b.status}</b></td>
        <td>${b.regDate}</td>
        <td>${actionBtn}</td>
      </tr>`;
    container.innerHTML += row;
  });
}

// Cancel Booking mock helper
window.cancelStaticBooking = function (bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    const bookings = getBookings();
    const bIndex = bookings.findIndex(b => b.id === bookingId);
    if (bIndex > -1) {
      bookings[bIndex].status = 'Cancelled';
      localStorage.setItem('bookings', JSON.stringify(bookings));
      alert("Booking cancelled successfully!");
      window.location.reload();
    }
  }
};

// Render Profile
function renderProfile() {
  const user = getLoggedInUser();
  if (!user) {
    alert("Please log in to view your profile.");
    window.location.href = 'index.html';
    return;
  }

  const users = getRegisteredUsers();
  const profileDetails = users[user.email] || { name: user.name, mnumber: '9876543210' };

  const container = document.getElementById('static-profile');
  container.innerHTML = `
    <form id="static-profile-form">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" class="form-control" name="fname" value="${profileDetails.name}" required>
      </div>
      <div class="form-group">
        <label>Mobile Number</label>
        <input type="text" class="form-control" name="mnumber" value="${profileDetails.mnumber || ''}" required>
      </div>
      <div class="form-group">
        <label>Email ID (Cannot be changed)</label>
        <input type="email" class="form-control" value="${user.email}" readonly>
      </div>
      <button type="submit" class="btn btn-success">Update Profile</button>
    </form>`;

  const form = document.getElementById('static-profile-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fname = e.target.fname.value;
    const mnumber = e.target.mnumber.value;

    const registeredUsers = getRegisteredUsers();
    if (!registeredUsers[user.email]) {
      registeredUsers[user.email] = { password: 'password123' };
    }
    registeredUsers[user.email].name = fname;
    registeredUsers[user.email].mnumber = mnumber;
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

    // Update session
    user.name = fname;
    localStorage.setItem('logged_in_user', JSON.stringify(user));

    alert("Profile updated successfully!");
    window.location.reload();
  });
}

// Render Issues list
function renderIssues() {
  const user = getLoggedInUser();
  const container = document.getElementById('static-issues');

  if (!user) {
    container.innerHTML = `<tr><td colspan="5" class="text-center">Please login to view support tickets.</td></tr>`;
    return;
  }

  const allIssues = JSON.parse(localStorage.getItem('support_issues') || '[]');
  const userIssues = allIssues.filter(i => i.email === user.email);

  if (userIssues.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="text-center">No issues reported yet.</td></tr>`;
    return;
  }

  container.innerHTML = '';
  userIssues.forEach((i, idx) => {
    const row = `
      <tr>
        <td>${idx + 1}</td>
        <td>${i.id}</td>
        <td><b>${i.issue}</b></td>
        <td>${i.description}</td>
        <td>${i.date}</td>
        <td class="text-success"><b>${i.status}</b></td>
      </tr>`;
    container.innerHTML += row;
  });
}
