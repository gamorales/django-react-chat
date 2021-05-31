from invoke import task


@task
def create_superuser(ctx):
    """Creates the superuser account 'admin' with password 'admin'."""
    ctx.run(
        """echo "from django.contrib.auth.models import User;
User.objects.create_superuser('admin', 'admin@example.com', 'admin')" |
python manage.py shell"""
    )
    print("superuser created admin:admin")


@task
def makemigrations(ctx, merge=False):
    """Creates new migrations based on any model changes.

    Any change to the Django ORM models must be reflected in the database.
    This command creates the migration file to apply these changes to the
    database. The `inv migrate` command is required to run the
    migrations against your database.
    """
    if merge:
        ctx.run("python3 manage.py makemigrations --merge")
    else:
        ctx.run("python3 manage.py makemigrations")


@task
def migrate(ctx):
    """Runs all the migrations.

    Requires the presence of a migration file to run against the database.
    See makemigrations.
    """
    ctx.run("python3 manage.py migrate --noinput")


@task
def create_rooms(ctx):
    """Creates default rooms for testing."""
    ctx.run("python3 manage.py loaddata apps/chats/fixtures/rooms.json")


@task
def run(ctx):
    """Runs the monolith."""
    ctx.run("python3 manage.py runserver")


@task
def shell(ctx):
    """Runs the command shell in iPython."""
    ctx.run("python3 manage.py shell")


@task
def flake8(ctx, cmd=None):
    """Runs flake8 to ensure Python code matches our style guide."""
    excluded_paths = ",".join(["site-packages", "migrations", "settings.py", "sdfad"])
    ctx.run(
        f"flake8 . --exclude={excluded_paths}",
    )
    print("Style check succeeded!")


@task
def black(ctx, check=False):
    """Runs black to auto-format the Python code."""
    command = ["black"]
    if check:
        command.append("--check")
    command.append(".")
    ctx.run(" ".join(command))


@task
def frontend_start(ctx):
    """Runs the frontend react app."""
    ctx.run("cd ./react_chat && yarn start")


@task
def frontend_install(ctx):
    """Install all frontend dependencies."""
    ctx.run("cd ./react_chat && yarn install")
