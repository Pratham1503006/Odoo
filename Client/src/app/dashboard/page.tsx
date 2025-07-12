'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  HeartIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { authHelpers, dbHelpers, User as SupabaseUser, SkillOffered, SkillWanted } from '../../lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [offeredSkills, setOfferedSkills] = useState<SkillOffered[]>([]);
  const [wantedSkills, setWantedSkills] = useState<SkillWanted[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check if user is authenticated
        const { session } = await authHelpers.getSession();

        if (!session) {
          router.push('/auth/login');
          return;
        }

        // Get user profile
        const { data: userProfile, error: userError } = await dbHelpers.users.getById(session.user.id);

        if (userError) {
          console.error('Error fetching user:', userError);
          router.push('/auth/login');
          return;
        }

        setUser(userProfile);

        // Get user's offered skills
        const { data: offered, error: offeredError } = await dbHelpers.skills.getOfferedByUser(session.user.id);
        if (offeredError) {
          console.error('Error fetching offered skills:', offeredError);
        } else {
          setOfferedSkills(offered || []);
        }

        // Get user's wanted skills
        const { data: wanted, error: wantedError } = await dbHelpers.skills.getWantedByUser(session.user.id);
        if (wantedError) {
          console.error('Error fetching wanted skills:', wantedError);
        } else {
          setWantedSkills(wanted || []);
        }

      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authHelpers.signOut();
      // Supabase automatically clears the session
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still redirect even if there's an error
      router.push('/auth/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Skill Swap Platform
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/browse"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse Skills
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">
              Manage your skills and discover new opportunities to learn and teach.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/skills/add"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <PlusIcon className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Add Skill</h3>
                  <p className="text-gray-600">Share your expertise</p>
                </div>
              </div>
            </Link>

            <Link
              href="/browse"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Browse Skills</h3>
                  <p className="text-gray-600">Find skills to learn</p>
                </div>
              </div>
            </Link>

            <Link
              href="/profile"
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                  <p className="text-gray-600">Update your info</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Your Skills */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Skills</h2>
            </div>
            <div className="p-6">
              {offeredSkills.length > 0 ? (
                <div className="space-y-4">
                  {offeredSkills.map((skill) => (
                    <div key={skill.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{skill.skill_name}</h3>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                          <div className="flex items-center mt-1">
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {skill.category}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              Added {new Date(skill.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PlusIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No skills yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by adding a skill you can teach to others.
                  </p>
                  <Link
                    href="/skills/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Your First Skill
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
