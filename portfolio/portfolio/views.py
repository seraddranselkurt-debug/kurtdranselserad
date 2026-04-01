from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

# ══════════════════════════════════════════════════════════════════
#  ✏️  ALL YOUR PERSONAL DATA LIVES HERE — edit freely
# ══════════════════════════════════════════════════════════════════

PORTFOLIO_DATA = {
    # ── Hero ──────────────────────────────────────────────────────
    "name":       "Kurt Dransel C. Serad",
    "title":      "IT Student",
    "tagline":    "Magna Est Viretas.",

    # ── Contact ───────────────────────────────────────────────────
    "email":      "seradkurtdransel@gmail.com",
    "linkedIn":   "#",
    "github":     "#",
    "location":   "Pagatban, Bayawan, Negros Oriental",

    # ── About ─────────────────────────────────────────────────────
    "bio": [
        "Kurt Dransel C. Serad is a 3rd-year BS Information Technology student passionate about technology, programming, and digital innovation. He is currently honing his skills to become a competent IT professional.",
        "In his free time, he enjoys playing mobile games and spending time with his family. He is determined to build strong technical skills and contribute meaningfully in the field of Information Technology.",
    ],


    # ── Skills ────────────────────────────────────────────────────
    # You can edit these later as you learn more technologies
    "skills": [
        {"category": "Languages",      "color": "c-blue",   "items": ["C++", "Python", "HTML5 / CSS3", "SQL"]},
        {"category": "Tools & Others", "color": "c-teal",   "items": ["github", "Visual Studio", "MySQL", "Netbeans"]},
        # Add more categories as you gain experience
    ],

    # ── Projects ──────────────────────────────────────────────────
    "projects": [
        {
            "title":       "Buy and Sell Management System",
            "desc":        "A comprehensive management system developed in C++ for handling buying and selling transactions, inventory tracking, and record management.",
            "stack":       ["C++"],

        },
        # You can add more projects here later
    ],

    # ── Education ─────────────────────────────────────────────────
    "education": [
        {
            "year":   "2023 – Present",
            "degree": "Bachelor of Science in Information Technology (3rd Year)",
            "school": "Negros Oriental State University (NORSU) - Bayawan - Santa Catalina Campus",
            "detail": "Currently pursuing BSIT degree with focus on programming and system development.",
        },
        {
            "year":   "2022 – 2023",
            "degree": "First Year College",
            "school": "Southern Tech College Foundation Incorporated",
            "detail": "2 years college degree with focus on programming and system development.",
        },
    ],
}


def index(request):
    """Render the single-page portfolio."""
    context = {"data": PORTFOLIO_DATA}
    return render(request, "portfolio/index.html", context)


@require_POST
def contact(request):
    """
    Handle the contact form.
    """
    try:
        body = json.loads(request.body)
    except (json.JSONDecodeError, AttributeError):
        body = request.POST

    name    = body.get("name", "").strip()
    email   = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not all([name, email, message]):
        return JsonResponse({"ok": False, "error": "All fields are required."}, status=400)

    # ── Console log (remove in production) ──
    print(f"\n📬 New contact from {name} <{email}>:\n{message}\n")

    # ── TODO: Uncomment this block when you're ready to send real emails ──
    # from django.core.mail import send_mail
    # send_mail(
    #     subject=f"Portfolio contact from {name}",
    #     message=f"From: {name} <{email}>\n\n{message}",
    #     from_email=email,
    #     recipient_list=["seradkurtdransel@gmail.com"],   # Your email
    # )

    return JsonResponse({"ok": True, "message": "Thanks! I'll be in touch soon."})